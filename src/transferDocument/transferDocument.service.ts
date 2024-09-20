import {prisma} from "../index";

class TransferDocumentService {

    async create(number: string, observation: string, requestId: string) {
        // const employeeExist = await this.findByCpf(cpf);
        // if (employeeExist && employeeExist.id != id) {
        //     throw new Error("Employee already exists in the database.");
        // }
        try {
            return await prisma.transferDocument.create({
                data: {
                    number,
                    observation,
                    requestId
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id: string, number: string, observation: string) {
        try {
            //const doctorExists = await this.findByCpf(cpf);

            //if (doctorExists && doctorExists.id != id) {
            //    throw new Error("Doctor already exists with this CP.");
            //}

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
            return await prisma.doctor.findMany({
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async getById(id: string){
        try{
            return await prisma.doctor.findUnique({where:{id:id},
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }});
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async delete(id: string){
        try{
            return await prisma.doctor.findUnique({where:{id:id},})

        }catch (error){
            console.error(error);
            throw error;
        }
    }

    private async findByCpf(cpf: string) {
        try {
            return await prisma.person.findUnique({
                where: {cpf}
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export {TransferDocumentService};