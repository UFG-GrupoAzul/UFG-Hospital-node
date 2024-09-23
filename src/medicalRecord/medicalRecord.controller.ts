import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import { TransferDocumentService } from '../transferDocument/transferDocument.service';
import { MedicalRecordService } from './medicalRecord.service';

class MedicalRecordController {

    private medicalRecordService: MedicalRecordService;

    constructor(medicalRecordService: MedicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    create = async (req: Request, res: Response) => {


        try {
            const {dosageInfo, dosageAmount, administration, administrationDate} = req.body
            this.isValidResponse(dosageInfo, dosageAmount, administration, administrationDate)
            const medicalRecord = await this.medicalRecordService.create(dosageInfo, dosageAmount, administration, administrationDate)
            return res.status(201).send(medicalRecord)

        } catch (error) {
            Util.handleError(res, error, "Error creating document transfer.");
        }
    }

    /* findAll = async (req: Request, res: Response) => {
        try{
            const transferDocuments = await this.transferDocumentService.getAll()
            return res.status(200).json(transferDocuments);
        }catch(error){
            Util.handleError(res, error, "Error fetching document transfer.");
        }
    }

    update = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);

            const {number, observation, requestId} = req.body
            this.isValidResponse(number, observation, requestId)

            const transferDocumentUpdated = await this.transferDocumentService.update(id, number, observation)
            return res.status(200).send(transferDocumentUpdated)


        }catch (error){
            Util.handleError(res, error, "Error updating doctor.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);

            const transferDocument = await this.transferDocumentService.getById(id)
            return res.status(200).json(transferDocument);
        } catch (error) {
            Util.handleError(res, error, "Error finding document transfer.");
        }

    }

    delete = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);

            const transferDocument = await this.transferDocumentService.delete(id)

            return res.status(200).send(transferDocument);
        }catch (error){
            Util.handleError(res, error, "Error deleting document transfer.");
        }
    } 

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const transferDocument = await this.transferDocumentService.getById(id);
            if (!transferDocument) {
                return res.status(404).json({error: "Document transfer not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching document transfer.");
        }
    } */


    private isValidResponse(dosageInfo: any, dosageAmount: any, administration: any, administrationDate: any) {
        Util.validString(dosageInfo, "dosageInfo");
        Util.validString(dosageAmount, "dosageAmount");
        Util.validString(administration, "administration");
        Util.validString(administrationDate, "administrationDate");
    }
}

const medicalRecordService = new MedicalRecordService();
const medicalRecordController = new MedicalRecordController(medicalRecordService);

export {medicalRecordController};