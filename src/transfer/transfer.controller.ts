import {Request, Response} from 'express';
import {TransferService} from "./transfer.service";
import {UserService} from "../users/user.service";

class TransferController {
    private transferService: TransferService;

    constructor(transferService: TransferService) {
        this.transferService = transferService;
    }

    async create(req: Request, res: Response): Promise<Response> {
        const {
            originDoctorId,
            destinationDoctorId,
            patientId,
            timeOfExit,
            requestId,
            regulatoryDoctorId
        } = req.body;

        try {
            const transfer = await this.transferService.create(
                originDoctorId,
                destinationDoctorId,
                patientId,
                timeOfExit,
                requestId,
                regulatoryDoctorId
            );

            return res.status(201).json(transfer);
        } catch (error) {
            console.error(`Error creating Transfer: ${error}`);
            return res.status(500).json({ error: 'Failed to create transfer.' });
        }
    }
}

export {transferController};
const transferService = new TransferService();
const transferController = new TransferController(transferService);