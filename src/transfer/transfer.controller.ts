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
            console.error(`Error creating Transfer: ${error}`);
            return res.status(500).json({error: 'Failed to create transfer.'});
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
            console.error(`Error updating transfer: ${error}`);
            return res.status(500).json({error: 'Failed to update transfer'});
        }

    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            this.isValidIdEntity(id);
            const transfer = await this.transferService.findById(id)
            return res.status(200).json(transfer)
        } catch (error) {
            console.error(`Error finding transfer: ${error}`);
            return res.status(404).json({error: 'Failed to find transfer'});
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const transfers = await this.transferService.findAll();
            return res.status(200).json(transfers);
        } catch (error) {
            console.error(`Error finding transfers: ${error}`);
            return res.status(500).json({error: 'Failed to find all transfers'});
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.transferService.delete(id)
            return res.status(204).json({msg: "Transfer deleted"});
        } catch (error) {
            console.error(`Error deleting transfer: ${error}`);
            return res.status(500).json({error: 'Failed to delete transfer'});
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
            console.error(`Error finding transfer: ${error}`);
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
        Util.validId(originDoctorId, "origin doctor");
        Util.validId(destinationDoctorId, "destination doctor");
        Util.validId(patientId, "patient");
        Util.validId(requestId, "request");
        Util.validId(regulatoryDoctorId, "regulatory doctor");
        Util.validEnum(Transport, transport, "transport");
        Util.validDate(timeOfExit, "time of exit");
    }

}

export {transferController};
const transferService = new TransferService();
const transferController = new TransferController(transferService);