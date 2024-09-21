import {prisma} from "../index";

class MedicalRecordService {

/*    async create(data: any) {
        try {
            const { prescribedDrugs, patientId } = data;

            return await prisma.medicalRecord.create({
                data: {
                    prescribedDrugs: {
                        create: prescribedDrugs
                    },
                    patientId: patientId
                },
                include: {
                    prescribedDrugs: true
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    } */

    async create(dosageInfo: string, dosageAmount: number, administration: string, administrationDate: string, insurance: string) {
        const regulatoryDoctorExists = await this.findByCrm(crm);
        if (regulatoryDoctorExists) {
            throw new Error("Regulatory Doctor already exists in the database");
        }
        try {
            return await prisma.regulatoryDoctor.create({
                data: {
                    crm,
                    insurance,
                    person: {
                        create: {
                            id: undefined,
                            name,
                            cpf,
                            phone,
                            dType: "RegulatoryDoctor"
                        }
                    }
                }, include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error creating regulatory doctor: ${error}`);
            throw error;
        }
    }

    async update(id: string, number: string, observation: string) {
        try {
            return await prisma.transferDocument.update({
                where: {id},
                data:  {
                    number,
                    observation
                }
            });
        }catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll(){
        try{
            return await prisma.transferDocument.findMany({
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    number: true,
                    observation: true,
                    requestId: true
                }
            })
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async getById(id: string){
        try{
            return await prisma.transferDocument.findUnique({where:{id:id},
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    number: true,
                    observation: true,
                    requestId: true
                }
            });
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async delete(id: string){
        try{
            await prisma.transferDocument.delete({
                where:{id}
            })

        }catch (error){
            console.log(`Error deleting document transfer: ${error}`);
            throw error;
        }
    }
}

export {MedicalRecordService};