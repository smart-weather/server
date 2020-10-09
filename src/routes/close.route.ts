import { Request, Response } from "express";
import axios from "axios"

export default class OpenRoute {
    constructor() {}

    public routes(app: any): void {
        app.route("/close")
            .get((req: Request, res: Response) => {
                axios.get("http://192.168.178.40:8090/close").then(result => {
                    console.log(result);
                    res.status(200).send("OFF");
                    //res.status(200).send(JSON.stringify(result));
                }).catch(err => {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                });
        });
    }
}