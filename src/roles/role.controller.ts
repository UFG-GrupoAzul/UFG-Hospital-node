import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {RoleService} from "./role.service";

class RoleController {

    private roleService: RoleService;

    constructor(roleService: RoleService) {
        this.roleService = roleService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {description} = req.body;
            this.isValidRequest(description);
            const role = await this.roleService.create(description);
            return res.status(201).json(role);
        } catch (error) {
            Util.handleError(res, error, "Error creating roles.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {description} = req.body;
            this.isValidRequest(description);
            const roleUpdated = await this.roleService.update(id, description);
            return res.status(200).json(roleUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating roles.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await this.roleService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting roles.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const roles = await this.roleService.findAll();
            return res.json(roles);
        } catch (error) {
            Util.handleError(res, error, "Error fetching roles.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const role = await this.roleService.findById(id);

            if (!role) {
                return res.status(404).json({error: "Role not found."});
            }
            return res.json(role);
        } catch (error) {
            Util.handleError(res, error, "Error fetching roles.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const role = await this.roleService.findById(id);
            if (!role) {
                return res.status(404).json({error: "Role not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching roles.");
        }
    }

    private isValidRequest(description: any) {
        Util.validString(description, "name");
    }
}

const roleService = new RoleService();
const roleController = new RoleController(roleService);
export {RoleController, roleController};

