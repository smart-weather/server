import { Request, Response } from "express";
import axios from "axios"

export class StatusRoute {
    constructor() {}

    public routes(app: any, id: string): void {
        app.route("/status/"+id)
            .get((req: Request, res: Response) => {
                axios.get("http://ValveControl:8090/"+id+"/status").then(result => {
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