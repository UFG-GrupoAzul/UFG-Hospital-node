import {hash} from "bcryptjs";
import {prisma} from "../index";

class UserService {

    private async getHashPassword(password: string) {
        return await hash(password, 10);
    }

    async create(name: string, email: string, password: string, permission: string) {
        const userExist = await this.findByEmail(email);
        if (userExist) {
            throw new Error("User already exists in the database.");
        }
        const hashPassword = await this.getHashPassword(password);
        try {
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    permission,
                    password: hashPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    permission: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            console.log(`Error creating user: ${error}`);
            throw error;
        }
    }

    async findByEmail(email: string) {
        try {
            return await prisma.user.findUnique({
                where: {email}
            });
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            throw error;
        }
    }


    async update(id: string, name: string, email: string, password: string, permission: string) {

        const userExist = await this.findByEmail(email);

        if (userExist && userExist.id != id) {
            throw new Error("User already exists in the database.");
        }
        let hashPassword = null;
        if (password) {
            hashPassword = await this.getHashPassword(password);
        }
        try {
            return await prisma.user.update({
                where: {id},
                data: {
                    name,
                    email,
                    permission,
                    ...(hashPassword && { password: hashPassword })
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            console.log(`Error updating user: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.user.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error deleting user: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            return await prisma.user.findMany({
                orderBy: {
                    name: "asc"
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    permission: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await prisma.user.findUnique({
                where: {id},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    permission: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            throw error;
        }
    }
}

export {UserService};
