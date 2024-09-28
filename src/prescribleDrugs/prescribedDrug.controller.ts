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
            // this.isValidRequest(name, activeIngredient, description);
            this.isValidateEnum(dosageUnit);
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
            Util.validId(id);
            const {
                dosageInfo,
                dosageAmount,
                administration,
                administrationDate,
                medicalRecordId,
                drugId,
                dosageUnit
            } = req.body;
            // this.isValidRequest(name, activeIngredient, description);
            this.isValidateEnum(dosageUnit);
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
            Util.validId(id);
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
            Util.validId(id);
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
            Util.validId(id);
            const prescribedDrugs = await this.prescribedDrugService.findById(id);
            if (!prescribedDrugs) {
                return res.status(404).json({msg: "No prescribed drugs found"});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, `Error verifying prescribed drugs. ${error}`);
        }
    }


    private isValidRequest(name: any, activeIngredient: any, description: any) {
        // Util.validString(name, "name");
        // Util.validString(activeIngredient, "activeIngredient");
        // Util.validString(description, "description");
    }

    private isValidateEnum(dosageUnitEnum: any) {
        if (!Object.values(DosageUnit).includes(dosageUnitEnum)) {
            throw new Error(`Invalid dosage unit. Enter one of the following values: ${Object.values(DosageUnit)}`);
        }
    }
}

const prescribedDrugService = new PrescribedDrugService();
const prescribedDrugController = new PrescribedDrugController(prescribedDrugService);
export {prescribedDrugController}