import {prisma} from "../index";

class SpecialtyService {

    async create(name: string, description: string) {
        const specialtyExist = await this.findByName(name);
        if (specialtyExist) {
            throw new Error("Specialty already exists in the database.");
        }
        try {
            return await prisma.specialty.create({
                data: {
                    name,
                    description
                }
            });
        } catch (error) {
            console.log(`Error creating specialty: ${error}`);
            throw error;
        }
    }

    async findByName(name: string) {
        try {
            return await prisma.specialty.findUnique({
                where: {
                    name}
            });
        } catch (error) {
            console.log(`Error fetching specialty: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, description: string) {
        const specialtyExist = await this.findByName(name);

        if (specialtyExist && specialtyExist.id != id) {
            throw new Error("Specialty already exists in the database.");
        }
        try {
            return await prisma.specialty.update({
                where: {id},
                data: {
                    name,
                    description
                }
            });
        } catch (error) {
            console.log(`Error updating specialty: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.specialty.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting specialty: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.specialty.findMany({
                orderBy: {
                    name: "asc"
                }
            });
        } catch (error) {
            console.log(`Error fetching specialty: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.specialty.findUnique({
                where: {id}
            });
        } catch (error) {
            console.log(`Error fetching specialty: ${error}`);
            throw error;
        }
    }
}

export {SpecialtyService};
