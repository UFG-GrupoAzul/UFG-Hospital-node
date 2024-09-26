import {NextFunction, Request, Response} from "express";
import {TransferService} from "./transfer.service";
import {Util} from "../utils/util";


class TransferController {
    private transferService: TransferService;

    constructor(transferService: TransferService) {
        this.transferService = transferService;
    }

    create = async (req: Request, res: Response) => {
        const {
            originDoctorId,
            destinationDoctorId,
            patientId,
            timeOfExit,
            requestId,
            regulatoryDoctorId
        } = req.body;
        const parsedTimeOfExit = await this.parseTimeOfExit(timeOfExit);

        try {

            const transfer = await this.transferService.create(
                originDoctorId,
                destinationDoctorId,
                patientId,
                parsedTimeOfExit,
                requestId,
                regulatoryDoctorId
            );

            return res.status(201).json(transfer);
        } catch (error) {
            console.error(`Error creating Transfer: ${error}`);
            return res.status(500).json({error: 'Failed to create transfer.'});
        }
    }

    update = async (req: Request, res: Response) => {
        const id = req.params.id
        const {
            originDoctorId,
            destinationDoctorId,
            patientId,
            timeOfExit,
            requestId,
            regulatoryDoctorId
        } = req.body;

        const parsedTimeOfExit = await this.parseTimeOfExit(timeOfExit);

        try {
            const transferUpdated = await this.transferService.update(id, originDoctorId, destinationDoctorId, patientId, parsedTimeOfExit, requestId, regulatoryDoctorId)
            return res.status(201).json(transferUpdated);
        } catch (error) {
            console.error(`Error updating transfer: ${error}`);
            return res.status(500).json({error: 'Failed to update transfer'});
        }

    }

    findById = async (req: Request, res: Response) => {
        const id = req.params.id
        try {
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
        const id = req.params.id;
        try {
            await this.transferService.delete(id)
            return res.status(204).json({msg: "Transfer deleted"});
        } catch (error) {
            console.error(`Error deleting transfer: ${error}`);
            return res.status(500).json({error: 'Failed to delete transfer'});
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        Util.validId(id);
        try {
            const transfer = await this.transferService.findById(id)
            if (!transfer) {
                return res.status(404).json({error: "No transfer found with this ID"});
            }
            return next()
        } catch (error) {
            console.error(`Error finding transfer: ${error}`);
        }


    }

    private async parseTimeOfExit(timeOfExit: string) {
        // Formato esperado: "YYYYMMDDTHHMM" -> "YYYY-MM-DDTHH:MM:00"
        const year = timeOfExit.substring(0, 4);
        const month = timeOfExit.substring(4, 6);
        const day = timeOfExit.substring(6, 8);
        const hour = timeOfExit.substring(9, 11);
        const minute = timeOfExit.substring(11, 13);

        const isoString = `${year}-${month}-${day}T${hour}:${minute}:00`;
        return new Date(isoString);
    }
}

export {transferController};
const transferService = new TransferService();
const transferController = new TransferController(transferService);