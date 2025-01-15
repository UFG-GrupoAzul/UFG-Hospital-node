import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {RequestService} from "./request.service";
import {Classification, Transport} from "@prisma/client";


class RequestController {
    private requestService: RequestService;

    constructor(requestService: RequestService) {
        this.requestService = requestService;
    }

    updateComplete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const requestUpdated = this.requestService.isComplete(id);
            return res.status(200).json(requestUpdated);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const {patientId, specialtyId, transferDocumentId, classification} = req.body;
            this.isValidateEnum(classification);
            const request = await this.requestService.create(patientId, specialtyId, transferDocumentId, classification);
            return res.status(201).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {specialtyId, classification} = req.body;
            this.isValidateEnum(classification);
            const requestUpdated = this.requestService.update(id, specialtyId, classification);
            return res.status(200).json(requestUpdated);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
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

    findAllCompleteFiltered = async (req: Request, res: Response) => {
        try {
            const request = await this.requestService.findAllCompleteFiltered();
            return res.status(200).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }


    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
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
            Util.validId(id);
            const request = await this.requestService.findById(id);
            if (!request) {
                return res.status(404).json({msg: "Not found"});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }

    private isValidateEnum(classificationEnum: any) {
        if (!Object.values(Classification).includes(classificationEnum)) {
            throw new Error(`Invalid classification. Enter one of the following values: ${Object.values(Classification)}`);
        }
    }
}

const requestService = new RequestService();
const requestController = new RequestController(requestService);
export {requestController};