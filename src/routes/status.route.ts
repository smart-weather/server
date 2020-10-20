import { Request, Response } from "express";
import axios from "axios"

export class StatusRoute {
    constructor() {}

    public routes(app: any): void {
        app.route("/status")
            .get((req: Request, res: Response) => {
                axios.get("http://192.168.178.40:8090/status").then(result => {
                    console.log(result)
                    let status: String = result.data;
                    console.log(status);
                    res.status(200).send(status === "OPENED"?"ON":"OFF");
                }).catch(err => {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                });
        });
    }
}