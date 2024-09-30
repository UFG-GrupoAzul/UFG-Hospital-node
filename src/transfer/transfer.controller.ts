import {NextFunction, Request, Response} from "express";
import {TransferService} from "./transfer.service";
import {Util} from "../utils/util";
import {Transport} from "@prisma/client";


class TransferController {
    private transferService: TransferService;

    constructor(transferService: TransferService) {
        this.transferService = transferService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {
                originDoctorId,
                destinationDoctorId,
                patientId,
                timeOfExit,
                requestId,
                regulatoryDoctorId,
                transport
            } = req.body;
            this.isValidRequest(originDoctorId, destinationDoctorId, patientId, timeOfExit, requestId, regulatoryDoctorId, transport);
            const transfer = await this.transferService.create(originDoctorId, destinationDoctorId, patientId, timeOfExit, requestId, regulatoryDoctorId, transport);
            return res.status(201).json(transfer);
        } catch (error) {
            Util.handleError(res, error, "Failed to create transfer");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const {
                originDoctorId,
                destinationDoctorId,
                patientId,
                timeOfExit,
                requestId,
                regulatoryDoctorId,
                transport
            } = req.body;
            this.isValidIdEntity(id);
            this.isValidRequest(
                originDoctorId,
                destinationDoctorId,
                patientId,
                timeOfExit,
                requestId,
                regulatoryDoctorId,
                transport);
            const transferUpdated = await this.transferService.update(id, originDoctorId, destinationDoctorId, patientId, timeOfExit, requestId, regulatoryDoctorId, transport)
            return res.status(201).json(transferUpdated);
        } catch (error) {
            Util.handleError(res, error, "Failed to update transfer");
        }

    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            this.isValidIdEntity(id);
            const transfer = await this.transferService.findById(id)
            return res.status(200).json(transfer)
        } catch (error) {
            Util.handleError(res, error, "Failed to find transfer");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const transfers = await this.transferService.findAll();
            return res.status(200).json(transfers);
        } catch (error) {
            Util.handleError(res, error, "Failed to find all transfer");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.transferService.delete(id)
            return res.status(204).json({msg: "Transfer deleted"});
        } catch (error) {
            Util.handleError(res, error, "Failed to delete transfer");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const transfer = await this.transferService.findById(id)
            if (!transfer) {
                return res.status(404).json({error: "No transfer found with this ID"});
            }
            return next()
        } catch (error) {
            Util.handleError(res, error, "Failed to finding transfer");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "transfer");
    }

    private isValidRequest(originDoctorId: any,
                           destinationDoctorId: any,
                           patientId: any,
                           timeOfExit: any,
                           requestId: any,
                           regulatoryDoctorId: any,
                           transport: any) {
        Util.validId(originDoctorId, "originDoctorId");
        Util.validId(destinationDoctorId, "destinationDoctorId");
        Util.validId(patientId, "patientId");
        Util.validId(requestId, "requestId");
        Util.validId(regulatoryDoctorId, "regulatoryDoctorId");
        Util.validEnum(Transport, transport, "transport");
        Util.validDate(timeOfExit, "timeOfExit");
    }

}

export {transferController};
const transferService = new TransferService();
const transferController = new TransferController(transferService);