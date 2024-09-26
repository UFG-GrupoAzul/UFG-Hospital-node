import {prisma} from "../index";

class TransferDocumentService {

    async create(number: string, observation: string) {
        try {
            return await prisma.transferDocument.create({
                data: {
                    number,
                    observation
                }
            });
        } catch (error) {
            console.error(error);
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
                }
            })
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async getById(id: string){
        try{
            return await prisma.transferDocument.findUnique({
                where:{id},
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    number: true,
                    observation: true,
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

export {TransferDocumentService};