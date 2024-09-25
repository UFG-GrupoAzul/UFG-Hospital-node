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
            const {patientId} = req.body
            this.isValidResponse(patientId)
            const medicalRecord = await this.medicalRecordService.create(patientId)
            return res.status(201).json(medicalRecord)
          } catch (error) {
            Util.handleError(res, error, "Error creating medical record.");
          }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);

            const {patientId} = req.body
            this.isValidResponse(patientId)

            const medicalRecord = await this.medicalRecordService.update(id, patientId)
            return res.status(200).json(medicalRecord);
        } catch (error) {
            Util.handleError(res, error, "Error updating medical record.");
        }
      }


    findAll = async (req: Request, res: Response) => {
        try {
          const medicalRecords = await this.medicalRecordService.getAll();
          return res.status(200).json(medicalRecords);
        } catch (error) {
            Util.handleError(res, error, "Error fetching medical record.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
          const id = req.params.id;
          Util.validId(id);


          const medicalRecord = await this.medicalRecordService.getById(id);
          return res.status(200).json(medicalRecord);
          
        } catch (error) {
            Util.handleError(res, error, "Error finding medical record.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
          const id = req.params.id;
          Util.validId(id);

          const medicalRecord = await this.medicalRecordService.delete(id);
          res.status(204).send(medicalRecord);
        } catch (error) {
            Util.handleError(res, error, "Error deleting medical record.");
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

    private isValidResponse(patientId: any) {
        Util.validString(patientId, "patientId");
    }
}

const medicalRecordService = new MedicalRecordService();
const medicalRecordController = new MedicalRecordController(medicalRecordService);

export {medicalRecordController};