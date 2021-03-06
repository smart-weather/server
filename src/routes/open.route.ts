import { Request, Response } from "express";
import axios from "axios"

export class OpenRoute {
    constructor() {}

    public routes(app: any, id: string): void {
        app.route("/open/"+id)
            .get((req: Request, res: Response) => {
                axios.get("http://192.168.178.40:8090/"+id+"/open").then(result => {
                    console.log(result)
                    res.status(200).send("ON");
                    //res.status(200).send(JSON.stringify(result));
                }).catch(err => {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                });
        });
    }
}