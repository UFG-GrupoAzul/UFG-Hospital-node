import { PrismaClient, Patient } from '@prisma/client';
import { prisma } from "../index";

class PatientService {
    prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async create(data: Omit<Patient, 'id'>): Promise<Patient> {
        const { birthDate, name, person } = data;


        const patientExists = await this.findByName(name);
        if (patientExists) {
            throw new Error("Patient already exists in the database");
        }

        try {
            return await this.prisma.patient.create({
                data: {
                    birthDate: new Date(birthDate),
                    name,
                    person,
                },
            });
        } catch (error) {
            console.log(`Error creating patient: ${error}`);
            throw error;
        }
    }

    async update(id: string, data: Omit<Patient, 'id'>): Promise<Patient> {
        const patientExists = await this.findById(id);
        if (!patientExists) {
            throw new Error("The Patient does not exist in the database.");
        }

        try {
            return await this.prisma.patient.update({
                where: { id },
                data: {
                    birthDate: new Date(data.birthDate),
                    name: data.name,
                    person:data.person,
                },
            });
        } catch (error) {
            console.log(`Error when updating Patient: ${error}`);
            throw error;
        }
    }

    async findById(id: string): Promise<Patient | null> {
        try {
            return await this.prisma.patient.findUnique({
                where: { id },
            });
        } catch (error) {
            console.log(`Error when searching for patient: ${error}`);
            throw error;
        }
    }

    async findByName(name: string): Promise<Patient | null> {
        try {
            return await this.prisma.patient.findFirst({
                where: { name },
            });
        } catch (error) {
            console.log(`Error when searching for patient by name: ${error}`);
            throw error;
        }
    }

    async findAll(): Promise<Patient[]> {
        try {
            return await this.prisma.patient.findMany();
        } catch (error) {
            console.log(`Error when searching for patients: ${error}`);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        const patientExists = await this.findById(id);
        if (!patientExists) {
            throw new Error("The Patient does not exist in the database.");
        }

        try {
            await this.prisma.patient.delete({
                where: { id },
            });
        } catch (error) {
            console.log(`Error deleting patient: ${error}`);
            throw error;
        }
    }
}

export { PatientService };
