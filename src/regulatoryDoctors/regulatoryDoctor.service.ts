import {prisma} from "../index";

class RegulatoryDoctorService {

    async create(name: string, cpf: string, phone: string, crm: string, insurance: string) {
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

    async update(id: string, name: string, cpf: string, phone: string, crm: string, insurance: string) {
        const regulatoryDoctorExists = await this.findByCrm(crm);
        if (regulatoryDoctorExists && regulatoryDoctorExists.id != id) {
            throw new Error("Regulatory Doctor already exists in the database.");
        }
        try {
            return await prisma.regulatoryDoctor.update({
                where: {id},
                data: {
                    crm,
                    insurance,
                    person: {
                        update: {
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
            console.log(`Error updating Regulatory Doctor: ${error}`);
            throw error;
        }
    }

    async findByCrm(crm: string) {
        try {
            return await prisma.regulatoryDoctor.findUnique({
                where: {crm}
            });
        } catch (error) {
            console.log(`Error fetching regulatory doctor: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.regulatoryDoctor.findMany({
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error fetching employees: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.regulatoryDoctor.findUnique({
                where: {id},
                include: {
                    person: true
                }
            });
        } catch (error) {
            console.log(`Error fetching regulatory doctor: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.regulatoryDoctor.delete({where: {id}})
        } catch (error) {
            console.log(`Error deleting regulatory doctor: ${error}`);
            throw error;
        }
    }
}

export {RegulatoryDoctorService};
