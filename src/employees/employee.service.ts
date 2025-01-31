import {prisma} from "../index";
import {Gender} from "@prisma/client";

class EmployeeService {

    async create(name: string, cpf: string, phone: string, registration: string, gender: Gender) {
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
                            name,
                            cpf,
                            phone,
                            gender,
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

    async update(id: string, name: string, cpf: string, phone: string, registration: string, gender: Gender) {
        const employeeExist = await this.findByCpf(cpf);
        if (employeeExist && employeeExist.id != id) {
            throw new Error("This CPF already exists in the database.");
        }
        try {
            return await prisma.employee.update({
                where: {id},
                data: {
                    registration,
                    person: {
                        update: {
                            name,
                            cpf,
                            phone,
                            gender
                        }
                    }
                }, include: {
                    person: true
                }
            })
        } catch (error) {
            console.log(`Error updating Employee: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.employee.findMany({
                include: {
                    person: true
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
        try {
            await prisma.employee.delete({where: {id}})
        } catch (error) {
            console.log(`Error deleting employee: ${error}`);
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
