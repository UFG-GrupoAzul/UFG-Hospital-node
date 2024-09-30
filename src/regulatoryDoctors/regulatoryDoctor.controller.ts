import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {RegulatoryDoctorService} from "./regulatoryDoctor.service";
import {Gender} from "@prisma/client";

class RegulatoryDoctorController {

    private regulatoryDoctorService: RegulatoryDoctorService;

    constructor(regulatoryDoctorService: RegulatoryDoctorService) {
        this.regulatoryDoctorService = regulatoryDoctorService;
    }


    create = async (req: Request, res: Response) => {
        try {
            const {name, cpf, phone, crm, insurance, gender} = req.body;
            this.isValidResponse(name, cpf, phone, crm, insurance, gender);
            const regulatoryDoctor = await this.regulatoryDoctorService.create(name, cpf, phone, crm, insurance, gender);
            return res.status(201).json(regulatoryDoctor);
        } catch (error) {
            Util.handleError(res, error, "Error creating regulatoryDoctors.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {name, cpf, phone, crm, insurance, gender} = req.body;
            this.isValidResponse(name, cpf, phone, crm, insurance, gender);
            const regulatoryDoctorUpdated = await this.regulatoryDoctorService.update(id, name, cpf, phone, crm, insurance, gender);
            return res.status(200).json(regulatoryDoctorUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating regulatory doctors.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.regulatoryDoctorService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting regulatory doctors.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const regulatoryDoctors = await this.regulatoryDoctorService.findAll();
            return res.json(regulatoryDoctors);
        } catch (error) {
            Util.handleError(res, error, "Error fetching regulatory doctors.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const regulatoryDoctor = await this.regulatoryDoctorService.findById(id);

            if (!regulatoryDoctor) {
                return res.status(404).json({error: "RegulatoryDoctor not found."});
            }
            return res.json(regulatoryDoctor);
        } catch (error) {
            Util.handleError(res, error, "Error fetching regulatory doctors.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const regulatoryDoctor = await this.regulatoryDoctorService.findById(id);
            if (!regulatoryDoctor) {
                return res.status(404).json({error: "RegulatoryDoctor not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching regulatory doctors.");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "regulatory doctor");
    }

    private isValidResponse(name: any, cpf: any, phone: any, crm: any, insurance: any, gender: any) {
        Util.validString(name, "name");
        Util.validString(cpf, "cpf");
        Util.validString(phone, "phone");
        Util.validString(crm, "crm");
        Util.validString(insurance, "insurance");
        Util.validEnum(Gender, gender, "gender");
    }

}

const regulatoryDoctorService = new RegulatoryDoctorService();
const regulatoryDoctorController = new RegulatoryDoctorController(regulatoryDoctorService);

export {RegulatoryDoctorController, regulatoryDoctorController};

