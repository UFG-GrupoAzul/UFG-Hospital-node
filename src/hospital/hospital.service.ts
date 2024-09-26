import {Hospital} from "@prisma/client";
import {prisma} from "../index";

class HospitalService {

    async create(name: string, phone: string, latitude: number,
                 longitude: number, availableBeds: number, icuAvailable: boolean): Promise<Hospital> {
        try {
            return await prisma.hospital.create({
                data: {
                    name,
                    phone,
                    latitude,
                    longitude,
                    availableBeds,
                    icuAvailable,
                }
            });

        } catch (error) {
            console.log(`Error creating hospital: ${error}`);
            throw error;
        }
    }

    async update(id: string, name: string, phone: string, latitude: number,
                 longitude: number, availableBeds: number, icuAvailable: boolean): Promise<Hospital> {
        try {
            return await prisma.hospital.update({
                where: {id},
                data: {
                    name,
                    phone,
                    latitude,
                    longitude,
                    availableBeds,
                    icuAvailable
                }
            });
        } catch (error) {
            console.log(`Error updating hospital: ${error}`);
            throw error;
        }

    }

    async getALl() {
        try {
            return await prisma.hospital.findMany()
        } catch (error) {
            console.log(`Error getting all hospitals: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.hospital.delete({
                where: {id}
            })
        } catch (error) {
            console.log(`Error deleting hospital: ${error}`);
            throw error;
        }
    }


    async getById(id: string) {
        try {
            return await prisma.hospital.findUnique({where: {id: id}});

        } catch (error) {
            console.log(`Error finding hospital: ${error}`);
            throw error;
        }
    }
}

export {HospitalService};