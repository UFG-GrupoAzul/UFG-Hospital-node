import {hash} from "bcryptjs";
import {prisma} from "../index";

class EmployeeService {

    private async getHashPassword(password: string) {
        return await hash(password, 10);
    }

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
                        create: { // Cria a Person e associa ao Employee
                            name,
                            cpf,
                            phone
                        }
                    }
                }, include: {
                    person: true // Inclui os dados de Person no retorno
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
                    person: true // Inclui os dados de Person no retorno
                }
            });
        } catch (error) {
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }



    private async findByCpf(cpf: string) {
        try{
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
