import express from "express";
import * as bodyparser from "body-parser"
import { TaskRunner } from "./tasks/task.runner.service";
import { WeatherRoute, OpenRoute, CloseRoute, StatusRoute } from "./routes";
import { DatabaseService } from "./db/db.service";

const portNumber = process.env.PORT || 8090;

export default class Main {
    private taskRunner: TaskRunner = new TaskRunner();
    private openRoute: OpenRoute = new OpenRoute();
    private closeRoute: CloseRoute = new CloseRoute();
    private statusRoute: StatusRoute = new StatusRoute();
    private weatherRoute: WeatherRoute = new WeatherRoute();
    private databaseService: DatabaseService = new DatabaseService(this.taskRunner);
    private server: express.Application;

    constructor(
    ) {
        this.server = express();
        this.config();
        this.weatherRoute.routes(this.server);
        this.openRoute.routes(this.server);
        this.closeRoute.routes(this.server);
        this.statusRoute.routes(this.server);


        this.databaseService.init();
    }
    
    private config () {
        this.server.use(bodyparser.json());
    }

    run() {
        this.databaseService.initOrm().then(() => {
            this.server.listen(Number(portNumber),  '0.0.0.0', () => {
                console.log(`Server listen on port: ${portNumber}`)
            });
        });
    }
}

const main = new Main();
main.run();