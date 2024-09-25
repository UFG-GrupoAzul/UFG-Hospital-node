import {prisma} from "../index";
import { MedicalRecord } from '@prisma/client';

class MedicalRecordService {

    async create(patientId: string) {
 
        try {
            return await prisma.medicalRecord.create({ 
                data: {
                    patientId
                } 
            });
        } catch (error) {
            console.log(`Error creating medical record: ${error}`);
            throw error;
        }
    }

    async update(id: string, patientId: string) {
        try {
          return await prisma.medicalRecord.update({ 
            where: { id }, 
            data: {
                patientId
            } 
        });
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

    async getById(id: string) {
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


    async delete(id: string) {
        try {
            await prisma.medicalRecord.delete({ 
                where: { id } 
            });
        } catch (error) {
            console.log(`Error deleting medical record: ${error}`);
            throw error;
        }
      }
}

export {MedicalRecordService};