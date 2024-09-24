import {Request, Response} from 'express';
import {TransferService} from "./transfer.service";
import {UserService} from "../users/user.service";

class TransferController {
    private transferService: TransferService;

    constructor(transferService: TransferService) {
        this.transferService = transferService;
    }

    create = async (req: Request, res: Response) => {
        const {
            originDoctorId,
            destinationDoctorId,
           // patientId,
            timeOfExit,
           // requestId,
            regulatoryDoctorId
        } = req.body;
        const parsedTimeOfExit = await this.parseTimeOfExit(timeOfExit);

        try {

            const transfer = await this.transferService.create(
                originDoctorId,
                destinationDoctorId,
             //   patientId,
                parsedTimeOfExit,
               // requestId,
                regulatoryDoctorId
            );

            return res.status(201).json(transfer);
        } catch (error) {
            console.error(`Error creating Transfer: ${error}`);
            return res.status(500).json({ error: 'Failed to create transfer.' });
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