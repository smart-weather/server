import { Request, Response } from "express";
import { DI } from '../db/db.service';

export class MoistureRoute {
    constructor() {}

    public routes(app: any): void {
        app.route("/moisture")
            .get((req: Request, res: Response) => {
                DI.moistureRepository.findAll().then(moistureData => {
                    res.status(200).send(moistureData);
                });
        });
    }
}