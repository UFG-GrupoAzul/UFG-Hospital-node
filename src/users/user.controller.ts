import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {UserService} from "./user.service";

class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    create = async (req: Request, res: Response) => {
        try {
            let {name, email, password, permission} = req.body;
            if (!permission) {
                permission = 'NO_PERMISSION';
            }
            this.isValidRequest(name, email, permission);
            this.validPassword(password);
            const user = await this.userService.create(name, email, password, permission);
            return res.status(201).json(user);
        } catch (error) {
            Util.handleError(res, error, "Error creating user.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            let {name, email, password, permission} = req.body;
            if (!permission) {
                permission = 'NO_PERMISSION';
            }
            this.isValidRequest(name, email, permission);
            const userUpdated = await this.userService.update(id, name, email, password, permission);
            return res.status(200).json(userUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating user.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await this.userService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting user.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            return res.json(users);
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const user = await this.userService.findById(id);
            if (!user) {
                return res.status(404).json({error: "User not found."});
            }
            return res.json(user);
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const user = await this.userService.findById(id);
            if (!user) {
                return res.status(404).json({error: "User not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }

    private validPassword(password: any) {
        Util.validString(password, "password");
    }

    private isValidRequest(name: any, email: any, permission: any) {
        Util.validString(name, "name");
        Util.validString(email, "email");
        Util.validString(permission, "permission");
    }
}

const userService = new UserService();
const userController = new UserController(userService);
export {UserController, userService, userController};

