import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {RequestService} from "./request.service";


class RequestController {
    private requestService: RequestService;

    constructor(requestService: RequestService) {
        this.requestService = requestService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {patientId, specialtyId, transferDocumentId} = req.body;
            const request = await this.requestService.create(patientId, specialtyId, transferDocumentId);
            return res.status(201).json(request);
        } catch (error) {
            Util.handleError(res, error, `Error creating request. ${error}`)
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {patientId, specialtyId, transferDocumentId} = req.body;
            const request = this.requestService.update(id, specialtyId);
            return res.status(200).json(request);
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
}

const requestService = new RequestService();
const requestController = new RequestController(requestService);
export {requestController};