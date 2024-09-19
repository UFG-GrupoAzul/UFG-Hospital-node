import {PrismaClient} from "@prisma/client";
import e, {Request, Response} from "express";


const {prismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createPatient = async (req: Request, res: Response) =>{
    const {birthDate, name} = req.body;

    try{
        const newPatient = await prisma.patient.create({
            data:{
                birthDate: new Date(birthDate),
                name,
            },
        });
        res.status(201).json(newPatient);
    } catch (error) {
        return res.status(404).json({error: "hihihi."});
    }
};
export const getAllPatients = async (_req: Request, res: Response): Promise<e.Response<any, Record<string, any>>> => {
    try {
        const patients = await prisma.patient.findMany();
        res.status(200).json(patients);
    } catch (error) {
        return res.status(404).json({error: " HEHEHEHE."});
    }
};
export const getPatientById = async (req: Request, res: Response): Promise<e.Response<any, Record<string, any>>> => {
    const { id } = req.params;

    try {
        const patient = await prisma.patient.findUnique({
            where: { id },
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        return res.status(404).json({error: "Not Not."});
    }
};

const updatePatient = async (req: Request, res: Responses) =>{
const {id} = req.params;
const {birthDate, name} = req.body;

try{
const updatePatient = await prisma.patient.update({
where:{id},
data:{
birthDate: new Date(birthDate),
name,
},
});

res.status(200).json(onUpdatedPatient);
} catch (error){
res.status(400).json({error:error});
}
};

export const deletePatient = async (req: Request, res: Response): Promise<e.Response<any, Record<string, any>>> => {

    const { id } = req.params;

    try {
        await prisma.patient.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        return res.status(404).json({error: "not found."});
    }
};

