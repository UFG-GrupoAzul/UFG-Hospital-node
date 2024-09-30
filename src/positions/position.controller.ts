import {NextFunction, Request, Response} from "express";
import {Util} from "../utils/util";
import {PositionService} from "./position.service";

class PositionController {

    private positionService: PositionService;

    constructor(positionService: PositionService) {
        this.positionService = positionService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const {description} = req.body;
            this.isValidRequest(description);
            const position = await this.positionService.create(description);
            return res.status(201).json(position);
        } catch (error) {
            Util.handleError(res, error, "Error creating positions.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const {description} = req.body;
            this.isValidRequest(description);
            const positionUpdated = await this.positionService.update(id, description);
            return res.status(200).json(positionUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating positions.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            await this.positionService.delete(id);
            return res.status(204).json({msg: "Deleted"});
        } catch (error) {
            Util.handleError(res, error, "Error deleting positions.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const positions = await this.positionService.findAll();
            return res.json(positions);
        } catch (error) {
            Util.handleError(res, error, "Error fetching positions.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const position = await this.positionService.findById(id);

            if (!position) {
                return res.status(404).json({error: "Position not found."});
            }
            return res.json(position);
        } catch (error) {
            Util.handleError(res, error, "Error fetching positions.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.isValidIdEntity(id);
            const position = await this.positionService.findById(id);
            if (!position) {
                return res.status(404).json({error: "Position not found."});
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching positions.");
        }
    }

    private isValidIdEntity(id: any) {
        Util.validId(id, "position");
    }

    private isValidRequest(description: any) {
        Util.validString(description, "name");
    }
}

const positionService = new PositionService();
const positionController = new PositionController(positionService);
export {PositionController, positionController};

