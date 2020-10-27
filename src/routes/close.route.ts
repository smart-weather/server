import { Request, Response } from "express";
import axios from "axios"

export class CloseRoute {
    constructor() {}

    public routes(app: any, id: string): void {
        app.route("/close/"+id)
            .get((req: Request, res: Response) => {
                axios.get("http://192.168.178.40:8090/"+id+"/close").then(result => {
                    res.status(200).send("OFF");
                }).catch(err => {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                });
        });
    }
}