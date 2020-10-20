import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import Axios from "axios";
import { TaskRunner } from "../tasks/task.runner.service";
import { Weather } from "./entities";

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    weatherRepository: EntityRepository<Weather>,
  };

const DEFAULT_INTERVAL = 30 * 60 * 1000;

export class DatabaseService {
    constructor(
        private taskRunner: TaskRunner,
        private interval: number = DEFAULT_INTERVAL
        ) {}

    public initOrm(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            MikroORM.init().then(orm => {
                DI.orm = orm;
                DI.em = orm.em;
                DI.weatherRepository = DI.orm.em.getRepository(Weather);
                resolve();
            });
        })
    }

    public init() {       
        this.taskRunner.registerTask("pollWeather", () => {
            Axios.get("http://weatherstation/data").then(result => {
                let { data } = result
                let newWeatherData = new Weather();
                newWeatherData.humidity = data.humidity;
                newWeatherData.pressure = data.pressure;
                newWeatherData.temperature = data.temprature;
                newWeatherData.altitude = data.altitude;
                newWeatherData.timestamp = new Date();

                DI.weatherRepository.persistAndFlush(newWeatherData);
                }).catch(error => {
                    console.error(`Error occured: Weatherstation not available ERR: ${error}`);
                });
        }, this.interval);
    }    
}