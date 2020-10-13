import { MikroORM } from "@mikro-orm/core";
import { Weather } from "./entities/weather.entity";

export class DatabaseService {
    constructor() {
        
    }

    public async init() {
        const orm = await MikroORM.init({
            entities: [Weather],
            dbName: "weatherstation",
            type: "mongo",
            clientUrl: ""
        });

        const weather = await orm.em.findOneOrFail(Weather, { 
            temperature: 22
        });

        console.log(weather);

        const newWeather = new Weather();
        newWeather.temperature = 18;
        newWeather.pressure = 1000;
        newWeather.humidity = 60;

        await orm.em.persistAndFlush(newWeather);

    }

    
}