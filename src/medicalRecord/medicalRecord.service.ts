import {prisma} from "../index";
import { MedicalRecord } from '@prisma/client';

class MedicalRecordService {

    async create(data: MedicalRecord): Promise<MedicalRecord> {
        /* const regulatoryDoctorExists = await this.findByCrm(crm);
        if (regulatoryDoctorExists) {
            throw new Error("Regulatory Doctor already exists in the database");
        } */
        try {
            return await prisma.medicalRecord.create({ data });
        } catch (error) {
            console.log(`Error creating medical record: ${error}`);
            throw error;
        }
    }

    async update(id: string, data: MedicalRecord): Promise<MedicalRecord> {
        try {
          return await prisma.medicalRecord.update({ where: { id }, data });
        } catch (error) {
            console.error(error);
            throw error;
        }
      }


    async getAll(): Promise<MedicalRecord[]> {
        try {
            return await prisma.medicalRecord.findMany({
                include: {
                    prescribedDrugs: true
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id: string): Promise<MedicalRecord | null> {
        try {
            return await prisma.medicalRecord.findUnique({ 
                where: { id },
                include: {
                    prescribedDrugs: true
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async delete(id: string): Promise<MedicalRecord> {
        try {
            return await prisma.medicalRecord.delete({ where: { id } });
        } catch (error) {
            console.log(`Error deleting document transfer: ${error}`);
            throw error;
        }
      }
}

export {MedicalRecordService};