import { Request, Response } from "express";
import axios from "axios"

export default class DataRoute {
    constructor() {}

    public routes(app: any): void {
        app.route("/data")
            .get((req: Request, res: Response) => {
                //get data from database. 
                res.status(200).send(JSON.stringify({temp: 29.9, humidity: 89, altitude: 200}));
        });
    }
}