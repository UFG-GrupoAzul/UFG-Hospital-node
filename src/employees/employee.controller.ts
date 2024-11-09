import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {EmployeeService} from "./employee.service";
import {Gender} from "@prisma/client";

class EmployeeController {

    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {name, cpf, phone, registration,gender} = req.body;
            this.isEnumValid(gender)
            this.isValidRequest(name, cpf, phone, registration)
            const employee = await this.employeeService.create(name, cpf, phone, registration,gender);
            return res.status(201).json(employee);
        } catch (error) {
            Util.handleError(res, error, "Error creating employees.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {name, cpf, phone, registration, gender} = req.body;
            this.isEnumValid(gender)
            this.isValidRequest(name, cpf, phone, registration)
            const employeeUpdated = await this.employeeService.update(id, name, cpf, phone, registration,gender);
            return res.status(200).json(employeeUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating employees.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await this.employeeService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting employees.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const employees = await this.employeeService.findAll();
            return res.json(employees);
        } catch (error) {
            Util.handleError(res, error, "Error fetching employees.");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const employee = await this.employeeService.findById(id);

            if (!employee) {
                return res.status(404).json({error: "Employee not found."});
            }
            return res.json(employee);
        } catch (error) {
            Util.handleError(res, error, "Error fetching employees.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const employee = await this.employeeService.findById(id);
            if (!employee) {
                return res.status(404).json({error: "Employee not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching employees.");
        }
    }

    private isValidRequest(name: any, cpf: any, phone: any, registration: any) {
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

const employeeService = new EmployeeService();
const employeeController = new EmployeeController(employeeService);

export {EmployeeController, employeeController};

