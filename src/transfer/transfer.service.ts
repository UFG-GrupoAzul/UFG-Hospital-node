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
        //patientId: string,
        timeOfExit: Date = new Date(),
        //requestId: string,
        regulatoryDoctorId: string) {
        const eta = this.generateEta(timeOfExit);

        try {

            // model Transfer {
            //     id                  String           @id @map("_id") @db.ObjectId
            //     originDoctorId      String           @unique @db.ObjectId
            //     destinationDoctorId String           @unique @db.ObjectId
            //     regulatoryDoctorId  String           @unique @db.ObjectId
            //     timeOfExit          DateTime
            //     eta                 DateTime
            //     patient             Patient          @relation(fields: [patientId], references: [id])
            //     patientId           String           @unique @db.ObjectId
            //     requestId           String           @db.ObjectId // Adiciona este campo
            //     request             Request          @relation(fields: [requestId], references: [id]) // Usa requestId na relação
            // }
            return await prisma.transfer.create({
                data: {
                    //id: requestId, // Usando o requestId como o ID da Transfer
                    originDoctorId,
                    destinationDoctorId,
                    //patientId,
                    timeOfExit,
                    regulatoryDoctorId,
                    eta,
                    //requestId: requestId, // Agora você usa o requestId diretamente
                }
            });
        } catch (error) {
            console.error(`Error creating Transfer: ${error}`);
            throw error;
        }
    }
}

export { TransferService };