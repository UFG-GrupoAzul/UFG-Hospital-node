import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {RequestService} from "./request.service";
import {Classification, DosageUnit, Transport} from "@prisma/client";


class RequestController {
    private requestService: RequestService;

    constructor(requestService: RequestService) {
        this.requestService = requestService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {patientId, specialtyId, transferDocumentId, classification} = req.body;
            this.isValidRequest(patientId, specialtyId, transferDocumentId, classification);
            const request = await this.requestService.create(patientId, specialtyId, transferDocumentId, classification);
            return res.status(201).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {specialtyId, classification} = req.body;
            this.isValidRequestUpdate(specialtyId, classification);
            const requestUpdated = await this.requestService.update(id, specialtyId, classification);
            return res.status(200).json(requestUpdated);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.requestService.delete(id);
            return res.status(204).json({msg: "Deleting request."});
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }
    findAll = async (req: Request, res: Response) => {
        try {
            const request = await this.requestService.findAll();
            return res.status(200).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const request = await this.requestService.findById(id);
            if (!request) {
                return res.status(404).json({msg: "Not found"});
            }
            return res.status(200).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            this.isValidIdEntity(id);
            const request = await this.requestService.findById(id);
            if (!request) {
                return res.status(404).json({msg: "Not found"});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "request");
    }

    private isValidRequest(patientId: any, specialtyId: any, transferDocumentId: any, classification: any) {
        Util.validId(patientId, "patientId");
        Util.validId(specialtyId, "specialtyId");
        Util.validId(transferDocumentId, "transferDocumentId");
        Util.validEnum(Classification, classification, "classification");
    }

    private isValidRequestUpdate(specialtyId: any, classification: any) {
        Util.validId(specialtyId, "specialty");
        Util.validEnum(Classification, classification, "classification");
    }
}

const requestService = new RequestService();
const requestController = new RequestController(requestService);
export {requestController};