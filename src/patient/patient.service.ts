import {PrismaClient, Patient} from '@prisma/client';
import {prisma} from "../index";

class PatientService {
    prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async create(name: string, cpf: string, phone: string, birthDate: Date): Promise<Patient> {
        const patientExists = await this.findByCpf(cpf);
        if (patientExists) {
            throw new Error("Patient already exists in the database");
        }

        try {
            return await this.prisma.patient.create({
                data: {
                    birthDate,
                    person: {
                        create: {
                            name,
                            cpf,
                            phone,
                            dType: "Patient"
                        }
                    }
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error creating patient: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, birthDate: Date): Promise<Patient> {
        const patientExists = await this.findByCpf(cpf);
        if (patientExists && patientExists.id != id) {
            throw new Error("This CPF already exists in the database.");
        }

        try {
            return await this.prisma.patient.update({
                where: {id},
                data: {
                    birthDate,
                    person: {
                        update: {
                            name,
                            cpf,
                            phone,
                        }
                    }
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error when updating Patient: ${error}`);
            throw error;
        }
    }

    async findById(id: string): Promise<Patient | null> {
        try {
            return await this.prisma.patient.findUnique({
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

    async findAll(): Promise<Patient[]> {
        try {
            return await this.prisma.patient.findMany({
                include: {
                    person: true
                }
            });
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
                where: {id},
            });
        } catch (error) {
            console.log(`Error deleting patient: ${error}`);
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

export {PatientService};
