import {prisma} from "../index";

class EmployeeService {

    async create(name: string, cpf: string, phone: string, registration: string) {
        const employeeExist = await this.findByCpf(cpf);
        if (employeeExist) {
            throw new Error("Employee already exists in the database.");
        }
        try {
            return await prisma.employee.create({
                data: {
                    registration,
                    person: {
                        create: {
                            id: undefined,
                            name,
                            cpf,
                            phone,
                            dType: "Employee"
                        }
                    }
                }, include: {
                    person: true
                }

            });
        } catch (error) {
            console.log(`Error creating employee: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, registration: string) {
       try{ const employeeExist = await this.findByCpf(cpf);
        if (!employeeExist)
            throw new Error("Employee not found in the database.")

        const employeeUpdated = await prisma.employee.update({
            where: {id},
            data: {
                registration,
                person: {
                    create: { // Cria a Person e associa ao Employee
                        name,
                        cpf,
                        phone
                    }
                }
            }, include: {
                person: true // Inclui os dados de Person no retorno
            }

        })
           return employeeUpdated;

       }catch (error) {
           console.log(`Error updating Employee: ${error}`);
           throw error;
       }
    }

    async findAll() {
        try {
            return await prisma.employee.findMany({
                include: {
                    person: true // Inclui os dados da Person
                }
            });
        } catch (error) {
            console.log(`Error fetching employees: ${error}`);
            throw error;
        }
    }



    async findById(id: string) {
        try {
            return await prisma.employee.findUnique({
                where: {id},
                include: {
                    person: true // Incluir os dados da Person associada
                }
            });
        } catch (error) {
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {

        await prisma.employee.delete({where:{id}})

    }





    private async findByCpf(cpf: string) {
        try {
            return await prisma.person.findUnique({
                where: {cpf}
            })
        }catch (error){
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }


}

export {EmployeeService};
