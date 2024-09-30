import {prisma} from "../index";
import {Gender} from "@prisma/client";

class PersonService {

    async create(name: string, cpf: string, phone: string, gender: Gender, dType: string, fieldName: string) {
        await this.checkExists(cpf, dType, fieldName);
        try {
            return await prisma.person.create({
                data: {
                    name,
                    cpf,
                    phone,
                    gender,
                    dType
                }
            });
        } catch (error) {
            console.log(`Error creating ${fieldName}: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, gender: Gender, dType: string, fieldName: string) {
        await this.checkExists(cpf, dType, fieldName, id);
        try {
            return await prisma.person.update({
                where: {id},
                data: {
                    name,
                    cpf,
                    phone,
                    gender
                }
            });
        } catch (error) {
            console.log(`Error updating ${fieldName}: ${error}`);
            throw error;
        }
    }

    private async findByCpfAndDType(cpf: string, dType: string, fieldName: string) {
        try {
            return await prisma.person.findUnique({
                where: {
                    cpf_dType: {
                        cpf,
                        dType,
                    }
                }
            });
        } catch (error) {
            console.log(`Error fetching ${fieldName}: ${error}`);
            throw error;
        }
    }

    private async checkExists(cpf: string, dType: string, fieldName: string, id?: string) {
        const employeeExist = await this.findByCpfAndDType(cpf, dType, fieldName);
        if (employeeExist && (!id || employeeExist.id !== id)) {
            throw new Error("This CPF already exists in the database.");
        }
    }

}

const personService = new PersonService();

export {personService};
