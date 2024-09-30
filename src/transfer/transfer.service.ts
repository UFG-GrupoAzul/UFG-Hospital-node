import {prisma} from "../index";
import {Transport} from "@prisma/client";

class TransferService {

    /**
     * Gerador aleatório de tempo para o fim determinar o tempo de chegada. Substituir por uma api que calcula rota.
     * @param timeOfExit
     * @private
     */
    private generateEta(timeOfExit: Date): Date {
        const randomMinutes = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
        const eta = new Date(timeOfExit);
        eta.setMinutes(eta.getMinutes() + randomMinutes);
        return eta;
    }

    async create(
        originDoctorId: string, destinationDoctorId: string,
        patientId: string,
        timeOfExit: Date,
        requestId: string,
        regulatoryDoctorId: string,
        transport: Transport) {
        try {
            const eta = this.generateEta(timeOfExit);
            return await prisma.transfer.create({
                data: {
                    originDoctorId,
                    destinationDoctorId,
                    patientId,
                    timeOfExit,
                    regulatoryDoctorId,
                    eta,
                    requestId,
                    transport
                }
            });
        } catch (error) {
            console.error(`Error creating Transfer: ${error}`);
            throw error;
        }
    }

    async update(id: string,
                 originDoctorId: string, destinationDoctorId: string,
                 patientId: string,
                 timeOfExit: Date,
                 requestId: string,
                 regulatoryDoctorId: string,
                 transport: Transport) {
        const eta = this.generateEta(timeOfExit);
        try {
            return await prisma.transfer.update({
                where: {id},
                data: {
                    originDoctorId,
                    destinationDoctorId,
                    patientId,
                    timeOfExit,
                    regulatoryDoctorId,
                    eta,
                    requestId,
                    transport
                }
            })
        } catch (error) {
            console.error(`Error updating Transfer: ${error}`);
            throw error;
        }

    }

    async delete(id: string) {
        try {
            await prisma.transfer.delete({where: {id}})
        } catch (error) {
            console.error(`Error deleting transfer: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.transfer.findUnique({where: {id}})
        } catch (error) {
            console.error(`Error fetching transfer by ID: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.transfer.findMany({})
        } catch (error) {
            console.error(`Error fetching all transfers: ${error}`);
            throw error;
        }
    }

}


export {TransferService};