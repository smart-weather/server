import express from "express";
import OpenRoute from "./routes/open.route";
import CloseRoute from "./routes/close.route";
import StatusRoute from "./routes/status.route";
import * as bodyparser from "body-parser"
import { TaskRunner } from "./tasks/task.runner.service";

const portNumber: number = 8090;

export default class Main {
    private taskRunner: TaskRunner = new TaskRunner();

    private openRoute: OpenRoute = new OpenRoute();
    private closeRoute: CloseRoute = new CloseRoute();
    private statusRoute: StatusRoute = new StatusRoute();
    private server: express.Application;

    constructor(
    ) {
        this.server = express();
        this.config();
        this.openRoute.routes(this.server);
        this.closeRoute.routes(this.server);
        this.statusRoute.routes(this.server);
    }
    
    private config () {
        this.server.use(bodyparser.json());
    }

    run(argv: Array<String>) {
        this.taskRunner.registerTask("pull-weather", () => {
            console.log("Hello World");
        }, 1000);

        this.server.listen(portNumber,  () => {
            console.log(`Server listen on port: ${portNumber}`)
        });
    }
}

const main = new Main();
main.run(process.argv);