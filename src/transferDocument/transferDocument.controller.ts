import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import { TransferDocumentService } from './transferDocument.service';

class TransferDocumentController {

    private transferDocumentService: TransferDocumentService;

    constructor(transferDocumentService: TransferDocumentService) {
        this.transferDocumentService = transferDocumentService;
    }

    create = async (req: Request, res: Response) => {


        try {
            const {number, observation} = req.body
            this.isValidResponse(number, observation)
            const transferDocument = await this.transferDocumentService.create(number, observation)
            return res.status(201).json(transferDocument)

        } catch (error) {
            Util.handleError(res, error, "Error creating document transfer.");
        }
    }

    findAll = async (req: Request, res: Response) => {
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

            const {number, observation} = req.body
            this.isValidResponse(number, observation)

            const transferDocumentUpdated = await this.transferDocumentService.update(id, number, observation)
            return res.status(200).json(transferDocumentUpdated)


        }catch (error){
            Util.handleError(res, error, "Error updating document transfer.");
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

            return res.status(204).json(transferDocument);
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
    }


    private isValidResponse(number: any, observation: any) {
        Util.validString(number, "number");
        Util.validString(observation, "observation");
    }
}

const transferDocumentService = new TransferDocumentService();
const transferDocumentController = new TransferDocumentController(transferDocumentService);

export {transferDocumentController};