import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {DrugsService} from "./drugs.service";

class DrugsController {
    private drugsService: DrugsService;

    constructor(drugsService: DrugsService) {
        this.drugsService = drugsService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const { name, activeIngredient, description } = req.body;
            this.isValidRequest(name, activeIngredient, description);
            const drugs = await this.drugsService.create(name, activeIngredient, description);
            return res.status(200).json(drugs);
        } catch (error) {
            Util.handleError(res, error, `Error creating drugs. ${error}`)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const { name, activeIngredient, description } = req.body;
            this.isValidRequest(name, activeIngredient, description);
            const drugs = await this.drugsService.update(id, name, activeIngredient, description);
            return res.status(200).json(drugs);
        } catch (error) {
            Util.handleError(res, error, `Error updating drugs. ${error}`);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await this.drugsService.delete(id);
            return res.status(200).json({msg: "Deleting drugs."});
        } catch (error) {
            Util.handleError(res, error, `Error deleting drugs. ${error}`);
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const drugs = await this.drugsService.findAll();
            return res.status(200).json(drugs);
        } catch (error) {
            Util.handleError(res, error, `Error fetching drugs. ${error}`);
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const drugs = await this.drugsService.findById(id);

            if (!drugs) {
                return res.status(404).json({msg: "No drugs found"});
            }

            return res.status(200).json(drugs);
        } catch (error) {
            Util.handleError(res, error, `Error fetching drugs. ${error}`);
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const drugs = await this.drugsService.findById(id);
            if (!drugs) {
                return res.status(404).json({msg: "No drugs found"});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, `Error verifying drugs. ${error}`);
        }
    }

    private isValidRequest(name: any, activeIngredient: any, description: any) {
        Util.validString(name, "name");
        Util.validString(activeIngredient, "activeIngredient");
        Util.validString(description, "description");
    }
}

const drugService = new DrugsService();
const drugController = new DrugsController(drugService);
export {DrugsController, drugController}