import {PrismaClient, Patient, Gender} from '@prisma/client';
import {prisma} from "../index";
import {BloodType} from "@prisma/client"
import {personService} from "../persons/person.service";

class PatientService {
    private readonly dType = "Patient";
    private readonly fieldName = "patient";

    async create(name: string, cpf: string, phone: string, birthDate: Date, bloodType: BloodType, gender: Gender) {
        const person = await personService.create(name, cpf, phone, gender, this.dType, this.fieldName);
        try {
            return await prisma.patient.create({
                data: {
                    birthDate,
                    bloodType,
                    id: person.id
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error creating patient: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, birthDate: Date, bloodType: BloodType, gender: Gender) {
        try {
            await personService.update(id, name, cpf, phone, gender, this.dType, this.fieldName);
            return await prisma.patient.update({
                where: {id},
                data: {
                    birthDate,
                    bloodType
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error when updating Patient: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.patient.findUnique({
                where: {id},
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error when searching for patient: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.patient.findMany({
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error when searching for patients: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.patient.delete({where: {id}});
            await prisma.person.delete({where: {id}});
        } catch (error) {
            console.log(`Error deleting patient: ${error}`);
            throw error;
        }
    }
}

export {PatientService};
