import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import { TransferDocumentService } from './transferDocument.service';
import { DoctorService } from '../doctor/doctor.service';

class TransferDocumentController {

    //private doctorService: DoctorService;
    private transferDocumentService: TransferDocumentService;

    constructor(transferDocumentService: TransferDocumentService) {
        this.transferDocumentService = transferDocumentService;
    }

    create = async (req: Request, res: Response) => {


        try {
            const {number, observation, requestId} = req.body
            this.isValidResponse(number, observation, requestId)
            const transferDocument = await this.transferDocumentService.create(number, observation, requestId)
            return res.status(201).send(transferDocument)

        } catch (error) {
            Util.handleError(res, error, "Error creating document transfer.");
        }
    }

/*    update = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);

            const {name, cpf, phone, email, registration, crm} = req.body
            this.isValidResponse(name, cpf, phone, email, registration, crm)

            const doctorUpdated = await this.doctorService.update(id, name, cpf, phone, registration, crm)
            return res.status(200).send(doctorUpdated)


        }catch (error){
            Util.handleError(res, error, "Error updating doctor.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try{
            const doctors = await this.doctorService.getAll()
            return res.status(200).json(doctors);
        }catch(error){
            Util.handleError(res, error, "Error deleting doctor.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);

            const doctor = await this.doctorService.getById(id)
            return res.status(200).json(doctor);
        } catch (error) {
            Util.handleError(res, error, "Error deleting doctor.");
        }

    }

    delete = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);

            const doctor = await this.doctorService.delete(id)

            return res.status(200).send(doctor);
        }catch (error){
            Util.handleError(res, error, "Error deleting doctor.");
        }
    } 

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const doctor = await this.doctorService.getById(id);
            if (!doctor) {
                return res.status(404).json({error: "Doctor not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching Doctor.");
        }
    } */


    private isValidResponse(number: any, observation: any, requestId: any) {
        Util.validString(number, "number");
        Util.validString(observation, "observation");
        Util.validString(requestId, "requestId");
    }
}

// const doctorService = new DoctorService();
// const doctorController = new DoctorController(doctorService);

const transferDocumentService = new TransferDocumentService();
const transferDocumentController = new TransferDocumentController(transferDocumentService);


export {transferDocumentController};