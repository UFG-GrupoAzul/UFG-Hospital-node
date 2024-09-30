import {prisma} from "../index";
import {Gender} from "@prisma/client";
import {$Enums} from ".prisma/client";
import {personService} from "../persons/person.service";

class EmployeeService {
    private readonly dType = "Employee";
    private readonly fieldName = "employee";

    async create(registration: string, positionId: string, name: string, cpf: string, phone: string, gender: Gender, dType?: string, fieldName?: string) {
        try {
            const person = await personService.create(name, cpf, phone, gender, dType ?? this.dType, fieldName ?? this.fieldName);
            return await prisma.employee.create({
                data: {
                    registration,
                    positionId,
                    id: person.id,
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error creating employee: ${error}`);
            throw error;
        }
    }

    async update(id: string, registration: string, positionId: string, name: string, cpf: string, phone: string, gender: Gender, dType?: string, fieldName?: string) {
        try {
            await personService.update(id, name, cpf, phone, gender, dType ?? this.dType, fieldName ?? this.fieldName);
            return await prisma.employee.update({
                where: {id},
                data: {
                    registration,
                    positionId
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
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error fetching employee: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.employee.delete({where: {id}});
            await prisma.person.delete({where: {id}});
        } catch (error) {
            console.log(`Error deleting employee: ${error}`);
            throw error;
        }
    }

}

export {EmployeeService};
