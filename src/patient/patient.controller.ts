import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import {PatientService} from "./patient.service";
import {BloodType, Gender} from "@prisma/client";


class PatientController {

    private patientService: PatientService;

    constructor(patientService: PatientService) {
        this.patientService = patientService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {
                name,
                cpf,
                phone,
                birthDate,
                bloodType,
                gender
            } = req.body;
            this.isValidRequest(name, cpf, phone, birthDate, bloodType, gender);
            const patient = await this.patientService.create(name, cpf, phone, birthDate, bloodType, gender)
            return res.status(201).json(patient);

        } catch (error) {
            Util.handleError(res, error, "Error creating patient.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {
                name,
                cpf,
                phone,
                birthDate,
                bloodType,
                gender
            } = req.body;
            this.isValidRequest(name, cpf, phone, birthDate, bloodType, gender);
            const patientUpdated = await this.patientService.update(id, name, cpf, phone, birthDate, bloodType, gender);
            return res.status(200).json(patientUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating patient.");
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.patientService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting patient.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const patient = await this.patientService.findAll();
            return res.json(patient);
        } catch (error) {
            Util.handleError(res, error, "Error fetching patient.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const patient = await this.patientService.findById(id);
            if (!patient) {
                return res.status(404).json({error: "Patient not found."});
            }
            return res.json(patient);
        } catch (error) {
            Util.handleError(res, error, "Error fetching patient.");
        }
    }
    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const patient = await this.patientService.findById(id);
            if (!patient) {
                return res.status(404).json({error: "Patient not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching patient.");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "patient");
    }

    private isValidRequest(name: any, cpf: any, phone: any, birthDate: any, bloodType: any, gender: any) {
        Util.validString(name, "name");
        Util.validString(cpf, "cpf");
        Util.validString(phone, "phone");
        Util.validString(birthDate, "birthDate");
        Util.validEnum(BloodType, bloodType, "blood type");
        Util.validEnum(Gender, gender, "gender");
    }

}

const patientService: PatientService = new PatientService();
const patientController = new PatientController(patientService);

export {patientController};
