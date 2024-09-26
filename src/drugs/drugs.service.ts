import {prisma} from "../index"


class DrugsService {

    async create(name: string, activeIngredient: string, description: string) {
        const drugExist = await this.findByName(name);
        if (drugExist) {
            throw new Error("Drug already exists in the database.");
        }
        try {
            return await prisma.drug.create({
                data: {
                    name,
                    activeIngredient,
                    description
                }
            });
        } catch (error) {
            console.log(`Error creating drug: ${error}`);
            throw error;
        }
    }

    async findByName(name: string) {
        try {
            return await prisma.drug.findUnique({
                where: {name}
            });
        } catch (error) {
            console.log(`Error fetching drug: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.drug.findMany({
                orderBy: {
                    name: "asc"
                }
            });
        } catch (error) {
            console.log(`Error fetching drug: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.drug.findUnique({
                where: {id}
            });
        } catch (error) {
            console.log(`Error fetching drug. ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, activeIngredient: string, description: string) {
        const drugExist = await this.findByName(name);
        if (drugExist && drugExist.id != id) {
            throw new Error("This drug already exists in the database.");
        }

        try {
            return await prisma.drug.update({
                where: {id},
                data: {
                    name,
                    activeIngredient,
                    description
                }
            })
        } catch (error) {
            console.log(`Error updating drug: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.drug.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting drug: ${error}`);
            throw error;
        }
    }
}

export {DrugsService}