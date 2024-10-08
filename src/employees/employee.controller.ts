import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {EmployeeService} from "./employee.service";
import {Gender} from "@prisma/client";
import {personService} from "../persons/person.service";

class EmployeeController {

    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {registration, positionId, name, cpf, phone, gender} = req.body;
            this.isValidRequest(name, cpf, phone, registration, positionId, gender)
            const employee = await this.employeeService.create(registration, positionId, name, cpf, phone, gender);
            return res.status(201).json(employee);
        } catch (error) {
            Util.handleError(res, error, "Error creating employees.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {registration, positionId, name, cpf, phone, gender} = req.body;
            this.isValidRequest(name, cpf, phone, registration, positionId, gender)
            const employeeUpdated = await this.employeeService.update(id, registration, positionId, name, cpf, phone, gender);
            return res.status(200).json(employeeUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating employees.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
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
            this.isValidIdEntity(id);
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
            this.isValidIdEntity(id);
            const employee = await this.employeeService.findById(id);
            if (!employee) {
                return res.status(404).json({error: "Employee not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching employees.");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "employee");
    }

    private isValidRequest(name: any, cpf: any, phone: any, registration: any, positionId: any, gender: any) {
        Util.validString(name, "name");
        Util.validString(cpf, "cpf");
        Util.validString(phone, "phone");
        Util.validString(registration, "registration");
        Util.validId(positionId, "positionId");
        Util.validEnum(Gender, gender, "gender");
    }

}

const employeeService = new EmployeeService();
const employeeController = new EmployeeController(employeeService);

export {employeeController, employeeService};

