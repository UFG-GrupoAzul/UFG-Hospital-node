import {NextFunction, Request, Response} from "express";
import {specialtyService} from "../index";
import {Util} from "../utils/util";

class SpecialtyController {

    create = async (req: Request, res: Response) => {
        try {
            const {name, description} = req.body;
            this.isValidResponse(name, description);
            const specialty = await specialtyService.create(name, description);
            return res.status(201).json(specialty);
        } catch (error) {
            Util.handleError(res, error, "Error creating specialties.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const {name, description} = req.body;
            this.isValidResponse(name, description);
            const specialtyUpdated = await specialtyService.update(id, name, description);
            return res.status(200).json(specialtyUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating specialties.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await specialtyService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting specialties.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const specialties = await specialtyService.findAll();
            return res.json(specialties);
        } catch (error) {
            Util.handleError(res, error, "Error fetching specialties.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const specialty = await specialtyService.findById(id);

            if (!specialty) {
                return res.status(404).json({error: "Specialty not found."});
            }
            return res.json(specialty);
        } catch (error) {
            Util.handleError(res, error, "Error fetching specialties.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const specialty = await specialtyService.findById(id);
            if (!specialty) {
                return res.status(404).json({error: "Specialty not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching specialties.");
        }
    }

    private isValidResponse(name: any, description: any) {
        Util.validString(name, "name");
        Util.validString(description, "name");
    }
}

export {SpecialtyController};

