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
            const {name, email, password, permission} = req.body;
            this.isValidRequest(name, email, password, permission);
            const user = await this.userService.create(name, email, password, permission);
            return res.status(201).json(user);
        } catch (error) {
            Util.handleError(res, error, "Error creating user.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {name, email, password, permission} = req.body;
            this.isValidRequest(name, email, password, permission);
            const userUpdated = await this.userService.update(id, name, email, password, permission);
            return res.status(200).json(userUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating user.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
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
            this.isValidIdEntity(id);
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
            this.isValidIdEntity(id);
            const user = await this.userService.findById(id);
            if (!user) {
                return res.status(404).json({error: "User not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "user");
    }

    private isValidRequest(name: any, email: any, password: any, permission: any) {
        Util.validString(password, "password");
        Util.validString(name, "name");
        Util.validString(email, "email");
        Util.validString(permission, "permission");
    }
}

const userService = new UserService();
const userController = new UserController(userService);
export {UserController, userService, userController};

