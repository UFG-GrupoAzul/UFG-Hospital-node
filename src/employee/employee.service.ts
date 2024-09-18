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

    async findAll() {
        try {
            return await prisma.employee.findMany({
                orderBy: {
                    person: {name: "asc"}
                },
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }


    private async findByCpf(cpf: string) {
        try {
            return await prisma.person.findUnique({
                where: {cpf}
            })
        } catch (error) {
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }


}

export {EmployeeService};
