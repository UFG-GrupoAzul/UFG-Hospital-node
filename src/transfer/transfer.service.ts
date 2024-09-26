import {prisma} from "../index";

class TransferService {

    private generateEta(timeOfExit: Date): Date {
        // Gera um número aleatório entre 10 e 60 minutos
        const randomMinutes = Math.floor(Math.random() * (60 - 10 + 1)) + 10;

        // Cria um novo objeto Date, adicionando os minutos aleatórios
        const eta = new Date(timeOfExit.getTime() + randomMinutes * 60000);

        return eta;
    }

    async create(
        originDoctorId: string, destinationDoctorId: string,
        patientId: string,
        timeOfExit: Date = new Date(),
        requestId: string,
        regulatoryDoctorId: string) {
        const eta = this.generateEta(timeOfExit);

        try {
            return await prisma.transfer.create({
                data: {
                    //id: requestId, // Usando o requestId como o ID da Transfer
                    originDoctorId,
                    destinationDoctorId,
                    patientId,
                    timeOfExit,
                    regulatoryDoctorId,
                    eta,
                    requestId
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
                 timeOfExit: Date = new Date(),
                 requestId: string,
                 regulatoryDoctorId: string) {

        const eta = this.generateEta(timeOfExit);

        try {
            return await prisma.transfer.update({
                where: {id},
                data: {
                    //id: requestId, // Usando o requestId como o ID da Transfer
                    originDoctorId,
                    destinationDoctorId,
                    patientId,
                    timeOfExit,
                    regulatoryDoctorId,
                    eta,
                    requestId, // Agora você usa o requestId diretamente
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