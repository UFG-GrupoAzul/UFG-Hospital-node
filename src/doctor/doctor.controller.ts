import {NextFunction, Request, Response} from 'express';
import {DoctorService} from './doctor.service';
import {Util} from "../utils/util";
import {Gender} from "@prisma/client";

class DoctorController {

    private doctorService: DoctorService;

    constructor(doctorService: DoctorService) {
        this.doctorService = doctorService;
    }

    create = async (req: Request, res: Response) => {


        try {
            const {name, cpf, phone,  registration, crm, gender} = req.body
            this.isEnumValid(gender)
            this.isValidResponse(name, cpf, phone,  registration, crm)
            const doctor = await this.doctorService.create(name, cpf, phone, registration, crm, gender)
            return res.status(201).send(doctor)

        } catch (error) {
            Util.handleError(res, error, "Error creating doctor.");
        }
    }

    update = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);

            const {name, cpf, phone, registration, crm,gender} = req.body
            this.isValidResponse(name, cpf, phone,  registration, crm)
            this.isEnumValid(gender)

            const doctorUpdated = await this.doctorService.update(id, name, cpf, phone, registration, crm, gender)
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

            return res.status(204).send(doctor);
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
    }


    private isValidResponse(name: any, cpf: any, phone: any,  registration: any, crm: any) {
        Util.validString(name, "name");
        Util.validString(cpf, "cpf");
        Util.validString(phone, "phone");
        Util.validString(registration, "registration");
    }

    private isEnumValid(gender: any){
        if(!Object.values(Gender).includes(gender)){
            throw new Error(`Invalid gender, enter one of the following: ${Object.values(Gender)}`);
        }
    }
}

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);
export {doctorController};