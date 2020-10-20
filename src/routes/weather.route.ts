import { Request, Response } from "express";
import { DI } from '../db/db.service';

export class WeatherRoute {
    constructor() {}

    public routes(app: any): void {
        app.route("/weather")
            .get((req: Request, res: Response) => {
                DI.weatherRepository.findAll().then(weatherData => {
                    res.status(200).send(weatherData);
                });
        });
    }
}