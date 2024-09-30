import {prisma} from "../index";
import {Gender} from "@prisma/client";
import {personService} from "../persons/person.service";

class RegulatoryDoctorService {
    private readonly dType = "RegulatoryDoctor";
    private readonly fieldName = "regulatory doctor";

    async create(name: string, cpf: string, phone: string, crm: string, insurance: string, gender: Gender) {
        const regulatoryDoctorExists = await this.findByCrm(crm);
        if (regulatoryDoctorExists) {
            throw new Error("Regulatory Doctor already exists in the database");
        }
        try {
            const person = await personService.create(name, cpf, phone, gender, this.dType, this.fieldName);
            return await prisma.regulatoryDoctor.create({
                data: {
                    crm,
                    insurance,
                    id: person.id
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error creating regulatory doctor: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, crm: string, insurance: string, gender: Gender) {
        const regulatoryDoctorExists = await this.findByCrm(crm);
        if (regulatoryDoctorExists && regulatoryDoctorExists.id != id) {
            throw new Error("Regulatory Doctor already exists in the database.");
        }
        try {
            await personService.update(id, name, cpf, phone, gender, this.dType, this.fieldName);
            return await prisma.regulatoryDoctor.update({
                where: {id},
                data: {
                    crm,
                    insurance
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error updating Regulatory Doctor: ${error}`);
            throw error;
        }
    }

    async findByCrm(crm: string) {
        try {
            return await prisma.regulatoryDoctor.findUnique({
                where: {crm}
            });
        } catch (error) {
            console.log(`Error fetching regulatory doctor: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.regulatoryDoctor.findMany({
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
            return await prisma.regulatoryDoctor.findUnique({
                where: {id},
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error fetching regulatory doctor: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.regulatoryDoctor.delete({where: {id}})
        } catch (error) {
            console.log(`Error deleting regulatory doctor: ${error}`);
            throw error;
        }
    }
}

export {RegulatoryDoctorService};
