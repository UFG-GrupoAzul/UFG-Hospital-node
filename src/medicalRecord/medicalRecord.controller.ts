import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import { MedicalRecordService } from './medicalRecord.service';

class MedicalRecordController {

    private medicalRecordService: MedicalRecordService;

    constructor(medicalRecordService: MedicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const medicalRecord = await this.medicalRecordService.create(req.body);
            res.status(201).json(medicalRecord);
          } catch (error) {
            Util.handleError(res, error, "Error creating medical record.");
          }
    }

    update = async (req: Request, res: Response) => {
        try {
          const medicalRecord = await this.medicalRecordService.update(req.params.id, req.body);
          res.status(200).json(medicalRecord);
        } catch (error) {
            Util.handleError(res, error, "Error updating medical record.");
        }
      }


    findAll = async (req: Request, res: Response) => {
        try {
          const medicalRecords = await this.medicalRecordService.getAll();
          res.status(200).json(medicalRecords);
        } catch (error) {
            Util.handleError(res, error, "Error fetching medical record.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
          const medicalRecord = await this.medicalRecordService.getById(req.params.id);
          if (medicalRecord) {
            res.status(200).json(medicalRecord);
          } else {
            res.status(404).json({ message: 'Medical record not found.' });
          }
        } catch (error) {
            Util.handleError(res, error, "Error finding medical record.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.medicalRecordService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            Util.handleError(res, error, "Error deleting document transfer.");
        }
      }


    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const medicalRecord = await this.medicalRecordService.getById(id);
            if (!medicalRecord) {
                return res.status(404).json({error: "Medical record not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching medical record.");
        }
    }

    private isValidResponse(dosageInfo: any, dosageAmount: any, administration: any, administrationDate: any, patientId: any) {
        Util.validString(dosageInfo, "dosageInfo");
        Util.validString(dosageAmount, "dosageAmount");
        Util.validString(administration, "administration");
        Util.validString(administrationDate, "administrationDate");
        Util.validString(patientId, "patientId");
    }
}

const medicalRecordService = new MedicalRecordService();
const medicalRecordController = new MedicalRecordController(medicalRecordService);

export {medicalRecordController};