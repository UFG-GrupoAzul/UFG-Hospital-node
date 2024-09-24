import {NextFunction, Request, Response} from 'express';
import {Util} from "../utils/util";
import {PatientService} from "./patient.service";


class PatientController{

    private patientService : PatientService;

    constructor(patientService: PatientService) {
        this.patientService = patientService;
    }
    create = async (req: Request, res: Response)=> {
        try {
            const {name, cpf, phone, birthDate} = req.body;
            // this.isValidRequest()
            const patient = await this.patientService.create(name, cpf, phone, birthDate)
            return res.status(201).json(patient);

        } catch (error) {
            Util.handleError(res, error, "Error creating patient.")
        }
    }

        update = async (req: Request, res: Response) => {
            try {
                 const id = req.params.id;
                Util.validId(id);
                const {name, cpf, phone,birthDate} = req.body;
                this.isValidRequest(name,cpf,phone,birthDate)
                const patientUpdated = await this.patientService.update(id,name,cpf, phone, birthDate);
                return res.status(200).json(patientUpdated);
            } catch (error) {
                Util.handleError(res, error, "Error updating patient.");
            }
        }
        delete =  async (req: Request, res: Response) => {
            try {
                const id = req.params.id;
                Util.validId(id);
                await this.patientService.delete(id);
                return res.status(204).json({msg: "Deleted"});
            } catch (error) {
                Util.handleError(res, error, "Error deleting patient.");
            }
        }

        findAll = async (req: Request, res: Response) => {
            try {
                const patient = await this.patientService.findAll();
                return res.json(patient);
            } catch (error) {
                Util.handleError(res, error, "Error fetching patient.");
            }
        }

        findById = async (req: Request, res: Response) => {
            try {
                const id = req.params.id;
                Util.validId(id);
                const patient = await this.patientService.findById(id);

                if (!patient) {
                    return res.status(404).json({error: "Patient not found."});
                }
                return res.json(patient);
            } catch (error) {
                Util.handleError(res, error, "Error fetching patient.");
            }
        }
        verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.id;
                Util.validId(id);
                const patient = await this.patientService.findById(id);
                if (!patient) {
                    return res.status(404).json({error: "Patient not found."});
                }
                return next();
            } catch (error) {
                Util.handleError(res, error, "Error fetching patient.");
            }
        }

        private isValidRequest(name: any, cpf: any, phone: any, birthDate: any) {
                Util.validString(name, "name");
                Util.validString(cpf, "cpf");
                Util.validString(phone, "phone");
                Util.validString(birthDate,"birthDate");

            }
        }

const patientService: PatientService = new PatientService();
const patientController  = new PatientController(patientService);

export  {patientController};
