import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {PrescribedDrugService} from "./prescribedDrug.service";
import {DosageUnit} from "@prisma/client";

class PrescribedDrugController {
    private prescribedDrugService: PrescribedDrugService;

    constructor(prescribedDrugService: PrescribedDrugService) {
        this.prescribedDrugService = prescribedDrugService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {
                dosageInfo,
                dosageAmount,
                administration,
                administrationDate,
                medicalRecordId,
                drugId,
                dosageUnit
            } = req.body;
            this.isValidRequest(dosageInfo, dosageAmount, administration, administrationDate, medicalRecordId, drugId, dosageUnit);
            const prescribedDrugs = await this.prescribedDrugService.create(dosageInfo,
                    dosageAmount,
                    administration,
                    administrationDate,
                    medicalRecordId,
                    drugId,
                    dosageUnit
                )
            ;
            return res.status(201).json(prescribedDrugs);
        } catch (error) {
            Util.handleError(res, error, `Error creating prescribed drugs. ${error}`)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {
                dosageInfo,
                dosageAmount,
                administration,
                administrationDate,
                medicalRecordId,
                drugId,
                dosageUnit
            } = req.body;
            this.isValidRequest(dosageInfo, dosageAmount, administration, administrationDate, medicalRecordId, drugId, dosageUnit);
            const prescribedDrugs = await this.prescribedDrugService.update(id,
                dosageInfo,
                dosageAmount,
                administration,
                administrationDate,
                medicalRecordId,
                drugId,
                dosageUnit);
            return res.status(200).json(prescribedDrugs);
        } catch (error) {
            Util.handleError(res, error, `Error updating prescribed drugs. ${error}`);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.prescribedDrugService.delete(id);
            return res.status(204).json({msg: "Deleting prescribed drugs."});
        } catch (error) {
            Util.handleError(res, error, `Error deleting prescribed drugs. ${error}`);
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const prescribedDrugs = await this.prescribedDrugService.findAll();
            return res.status(200).json(prescribedDrugs);
        } catch (error) {
            Util.handleError(res, error, `Error fetching prescribed drugs. ${error}`);
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const prescribedDrugs = await this.prescribedDrugService.findById(id);

            if (!prescribedDrugs) {
                return res.status(404).json({msg: "No prescribed drugs found"});
            }

            return res.status(200).json(prescribedDrugs);
        } catch (error) {
            Util.handleError(res, error, `Error fetching prescribed drugs. ${error}`);
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const prescribedDrugs = await this.prescribedDrugService.findById(id);
            if (!prescribedDrugs) {
                return res.status(404).json({msg: "No prescribed drugs found"});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, `Error verifying prescribed drugs. ${error}`);
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "prescribed drug");
    }

    private isValidRequest(dosageInfo: any,
                           dosageAmount: any,
                           administration: any,
                           administrationDate: any,
                           medicalRecordId: any,
                           drugId: any,
                           dosageUnit: any) {
        Util.validString(dosageInfo, "dosage info");
        Util.validString(dosageAmount, "dosage amount");
        Util.validString(administration, "administration");
        Util.validString(administrationDate, "administration date");
        Util.validId(medicalRecordId, "medical record");
        Util.validId(drugId, "drug");
        Util.validEnum(DosageUnit, dosageUnit, "dosage unit");
    }

}

const prescribedDrugService = new PrescribedDrugService();
const prescribedDrugController = new PrescribedDrugController(prescribedDrugService);
export {prescribedDrugController}