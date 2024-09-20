import {prisma} from "../index";

class RoleService {

    async create(description: string) {
        const roleExist = await this.findByDescription(description);
        if (roleExist) {
            throw new Error("Role already exists in the database.");
        }
        try {
            return await prisma.role.create({
                data: {
                    description
                }
            });
        } catch (error) {
            console.log(`Error creating role: ${error}`);
            throw error;
        }
    }

    async findByDescription(description: string) {
        try {
            return await prisma.role.findUnique({
                where: {description}
            });
        } catch (error) {
            console.log(`Error fetching role: ${error}`);
            throw error;
        }
    }

    async update(id: string, description: string) {
        const roleExist = await this.findByDescription(description);

        if (roleExist && roleExist.id != id) {
            throw new Error("Role already exists in the database.");
        }
        try {
            return await prisma.role.update({
                where: {id},
                data: {
                    description
                }
            });
        } catch (error) {
            console.log(`Error updating role: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.role.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting role: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.role.findMany({
                orderBy: {
                    description: "asc"
                }
            });
        } catch (error) {
            console.log(`Error fetching role: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.role.findUnique({
                where: {id}
            });
        } catch (error) {
            console.log(`Error fetching role: ${error}`);
            throw error;
        }
    }
}

export {RoleService};
