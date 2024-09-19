import {HospitalService} from "./hospital.service";
import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";


class HospitalController {

    private hospitalService: HospitalService

    constructor(hospitalService: HospitalService) {
        this.hospitalService = hospitalService;
    }

    create = async(req: Request, res: Response) => {
        try{
            const {name,phone,latitude,longitude,availableBeds,icuAvailable} = req.body;
            this.isValidResponse(name,phone,latitude,longitude,availableBeds,icuAvailable)
            const hospital = await this.hospitalService.create(name,phone,latitude,longitude,availableBeds,icuAvailable)
            return res.status(201).json(hospital);

        }catch(error){
            Util.handleError(res, error, "Error creating hospital.");
        }
    }

    update = async(req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);
            const {name,phone,latitude,longitude,availableBeds,icuAvailable} = req.body;
            this.isValidResponse(name,phone,latitude,longitude,availableBeds,icuAvailable)
            const hospitalUpdated = await this.hospitalService.update(id,name,phone,latitude,longitude,availableBeds,icuAvailable)
            return res.status(200).json(hospitalUpdated);
        }catch(error){
            Util.handleError(res, error, "Error updating hospital.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const hospital = await this.hospitalService.getById(id)
            return res.status(200).json(hospital);
        }catch (error){
            Util.handleError(res, error, "Error finding hospital.");
        }

    }

    findAll = async (req: Request, res: Response) => {
        try{
            const hospitals = await this.hospitalService.getALl()
            return res.status(200).json(hospitals);

        }catch(error){
            Util.handleError(res, error, "Error finding all hospitals.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            Util.validId(id);
            await this.hospitalService.delete(id)

            return res.status(204).json(true)

        }catch (error){
            Util.handleError(res, error, "Error deleting hospital.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction)=> {
        try{
            const id = req.params.id;
            Util.validId(id);
            const hospital = await this.hospitalService.getById(id)
            if (!hospital) {
                return res.status(404).json({error: "No hospital found."});
            }
            return next()
        }catch(error){
            Util.handleError(res, error, "Error verifying if hospital exists.");
        }
    }



    private isValidResponse(name: any, phone: any, latitude: any, longitude: any, availableBeds: any, icuAvailable: any) {
        Util.validString(name, "name")
        Util.validString(phone, "phone")
        Util.validNumber(latitude, "latitude")
        Util.validNumber(longitude, "longitude")
        Util.validNumber(availableBeds, "availableBeds")
        Util.validBoolean(icuAvailable, "icuAvailable")
    }
}

const hospitalService = new HospitalService();
const hospitalController = new HospitalController(hospitalService);
export {hospitalController};