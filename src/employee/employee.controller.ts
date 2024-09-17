import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {employeeService} from "../index";

class EmployeeController {


    create = async (req: Request, res: Response) => {
        try {
            const {name,cpf, phone, email, registration} = req.body;
           // this.isValidResponse(name, email, password, );
            const employee = await employeeService.create(name,cpf, phone, registration);
            return res.status(201).json(employee);
        } catch (error) {
            Util.handleError(res, error, "Error creating employee.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {name, email, password, permission} = req.body;
            this.isValidResponse(name, email, password, permission);
            const employeeUpdated = await employeeService.update(id, name, email, password, permission);
            return res.status(200).json(employeeUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating employee.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await employeeService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting employee.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const employees = await employeeService.findAll();
            return res.json(employees);
        } catch (error) {
            Util.handleError(res, error, "Error fetching employee.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const employee = await employeeService.findById(id);

            if (!employee) {
                return res.status(404).json({error: "Employee not found."});
            }
            return res.json(employee);
        } catch (error) {
            Util.handleError(res, error, "Error fetching employee.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const employee = await employeeService.findById(id);
            if (!employee) {
                return res.status(404).json({error: "Employee not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching employee.");
        }
    }

    private isValidResponse(name: any, email: any, password: any, permission: any) {
        Util.validString(password, "name");
        Util.validString(name, "name");
        Util.validString(email, "email");
        Util.validString(permission, "permission");
    }
}

export {EmployeeController};
