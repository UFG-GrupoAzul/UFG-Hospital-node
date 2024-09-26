import {prisma} from "../index"


class PrescribedDrugService {

    async create(dosageInfo: string,
                 dosageAmount: number,
                 administration: string,
                 administrationDate: Date,
                 medicalRecordId: string,
                 drugId: string) {
        try {
            return await prisma.prescribedDrug.create({
                data: {
                    dosageInfo,
                    dosageAmount,
                    administration,
                    administrationDate,
                    medicalRecordId,
                    drugId
                }
            });
        } catch (error) {
            console.log(`Error creating prescribed drug: ${error}`);
            throw error;
        }
    }

    async update(id: string,
                 dosageInfo: string,
                 dosageAmount: number,
                 administration: string,
                 administrationDate: Date,
                 medicalRecordId: string,
                 drugId: string
    ) {
        try {
            return await prisma.prescribedDrug.update({
                where: {id},
                data: {
                    dosageInfo,
                    dosageAmount,
                    administration,
                    administrationDate,
                    medicalRecordId,
                    drugId
                }
            })
        } catch
            (error) {
            console.log(`Error updating prescribed drug: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.prescribedDrug.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting prescribed drug: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.prescribedDrug.findUnique({
                where: {id}
            });
        } catch (error) {
            console.log(`Error fetching prescribed drug: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.prescribedDrug.findMany({
                orderBy: {
                    administrationDate: "asc"
                }
            });
        } catch (error) {
            console.log(`Error fetching prescribed drug: ${error}`);
            throw error;
        }
    }


}

export {PrescribedDrugService}