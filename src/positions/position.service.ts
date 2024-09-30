import {prisma} from "../index";

class PositionService {

    async create(description: string) {
        const positionExist = await this.findByDescription(description);
        if (positionExist) {
            throw new Error("Position already exists in the database.");
        }
        try {
            return await prisma.position.create({
                data: {
                    description
                }
            });
        } catch (error) {
            console.log(`Error creating position: ${error}`);
            throw error;
        }
    }

    async findByDescription(description: string) {
        try {
            return await prisma.position.findUnique({
                where: {description}
            });
        } catch (error) {
            console.log(`Error fetching position: ${error}`);
            throw error;
        }
    }

    async update(id: string, description: string) {
        const positionExist = await this.findByDescription(description);

        if (positionExist && positionExist.id != id) {
            throw new Error("Position already exists in the database.");
        }
        try {
            return await prisma.position.update({
                where: {id},
                data: {
                    description
                }
            });
        } catch (error) {
            console.log(`Error updating position: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.position.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting position: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.position.findMany({
                orderBy: {
                    description: "asc"
                }
            });
        } catch (error) {
            console.log(`Error fetching position: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.position.findUnique({
                where: {id}
            });
        } catch (error) {
            console.log(`Error fetching position: ${error}`);
            throw error;
        }
    }
}

export {PositionService};
