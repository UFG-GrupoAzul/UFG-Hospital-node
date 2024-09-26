import {prisma} from "../index";
import * as sea from "node:sea";

class RequestService {
    async create(patientId: string, specialtyId: string, transferDocumentId: string) {
        try {
            return await prisma.request.create({
                data: {
                    patientId,
                    specialtyId,
                    transferDocumentId
                }
            });
        } catch (error) {
            console.log(`Error creating request: ${error}`);
            throw error;
        }
    }

    /**
     * Somente será possível trocar a especialidade da requisição, qualquer outro dados deve alterar no modelo necessário.
     * @param id
     * @param specialtyId
     */
    async update(id: string, specialtyId: string) {
        try {
            return await prisma.request.update({
                where: {id},
                data: {
                    specialtyId,
                }
            })
        } catch (error) {
            console.log(`Error creating request: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await prisma.request.delete({
                where: {id},
            });
        } catch (error) {
            console.log(`Error deleting request: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.request.findMany({
                orderBy: {
                    createdAt: "desc",
                }
            });
        } catch (error) {
            console.log(`Error fetching request: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.request.findUnique({
                where: {id},
            })
        } catch (error) {
            console.log(`Error fetching request: ${error}`);
            throw error;
        }
    }
}

export {RequestService};