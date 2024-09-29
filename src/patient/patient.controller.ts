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
            this.isValidateEnum(bloodType);
            this.isValidRequest(name,cpf,phone, birthDate);
            this.isEnumValid(gender)
            const patient = await this.patientService.create(name, cpf, phone, birthDate, bloodType,gender)
            return res.status(201).json(patient);

        } catch (error) {
            Util.handleError(res, error, "Error creating patient.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {
                name,
                cpf,
                phone,
                birthDate,
                bloodType,
                gender
            } = req.body;
            this.isValidateEnum(bloodType);
            this.isValidRequest(name, cpf, phone, birthDate)
            this.isEnumValid(gender)
            const patientUpdated = await this.patientService.update(id, name, cpf, phone, birthDate, bloodType, gender);
            return res.status(200).json(patientUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating patient.");
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
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
            Util.validId(id);
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
            Util.validId(id);
            const patient = await this.patientService.findById(id);
            if (!patient) {
                return res.status(404).json({error: "Patient not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching patient.");
        }
    }

    private isValidRequest(name: any, cpf: any, phone: any, birthDate: any) {
        Util.validString(name, "name");
        Util.validString(cpf, "cpf");
        Util.validString(phone, "phone");
        Util.validString(birthDate, "birthDate");

    }

    private isValidateEnum(bloodType: any) {
        if (!Object.values(BloodType).includes(bloodType)) {
            throw new Error(`Invalid blood type. Enter one of the following values: ${Object.values(BloodType)}`);
        }
    }

    private isEnumValid(gender: any){
        if(!Object.values(Gender).includes(gender)){
            throw new Error(`Invalid gender, enter one of the following: ${Object.values(Gender)}`);
        }
    }
}

const patientService: PatientService = new PatientService();
const patientController = new PatientController(patientService);

export {patientController};
