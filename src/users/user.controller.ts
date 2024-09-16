import {NextFunction, Request, Response} from "express";
import {userService} from "../index";
import {Util} from "../utils/util";

class UserController {


    create = async (req: Request, res: Response) => {
        try {
            const {name, email, password, permission} = req.body;
            this.isValidResponse(name, email, password, permission);
            const user = await userService.create(name, email, password, permission);
            return res.status(201).json(user);
        } catch (error) {
            Util.handleError(res, error, "Error creating user.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {name, email, password, permission} = req.body;
            this.isValidResponse(name, email, password, permission);
            const userUpdated = await userService.update(id, name, email, password, permission);
            return res.status(200).json(userUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating user.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await userService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting user.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const users = await userService.findAll();
            return res.json(users);
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const user = await userService.findById(id);

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
            const user = await userService.findById(id);
            if (!user) {
                return res.status(404).json({error: "User not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }

    private isValidResponse(name: any, email: any, password: any, permission: any) {
        Util.validString(password, "name");
        Util.validString(name, "name");
        Util.validString(email, "email");
        Util.validString(permission, "permission");
    }
}

export {UserController};

