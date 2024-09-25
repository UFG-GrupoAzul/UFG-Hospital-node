import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {Util} from "../utils/util";

const prisma = new PrismaClient();

export const createPatient = async (req: Request, res: Response): Promise<void> => {
    const { birthDate, name } = req.body;

    try {
        const newPatient = await prisma.patient.create({
            data: {
                birthDate: new Date(birthDate),
                name,
            },
        });
        res.status(201).json(newPatient);
    } catch (error) {
        Util.handleError(res, error, 'Database error');
    }
};


export const getAllPatients = async (_req: Request, res: Response): Promise<void> => {
    try {
        const patients = await prisma.patient.findMany();
        res.status(200).json(patients);
    } catch (error) {
        Util.handleError(res, error, "Error creating patient.");
    }
};


export const getPatientById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const patient = await prisma.patient.findUnique({
            where: { id },
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        res.status(200).json(patient);
    } catch (error) {
        Util.handleError(res, error, "");
    }
};

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { birthDate, name } = req.body;

    try {
        const updatedPatient = await prisma.patient.update({
            where: { id },
            data: {
                birthDate: new Date(birthDate),
                name,
            },
        });

        res.status(200).json(updatedPatient);
    } catch (error) {
        Util.handleError(res, error, "Error updating Patient.");
    }
};

// Delete a patient by ID
export const deletePatient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await prisma.patient.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        Util.handleError(res, error, "Excluded patient.");
    }
};