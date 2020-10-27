import express from "express";
import * as bodyparser from "body-parser"
import { TaskRunner } from "./tasks/task.runner.service";
import { WeatherRoute, OpenRoute, CloseRoute, StatusRoute, MoistureRoute } from "./routes";
import { DatabaseService } from "./db/db.service";

const portNumber = process.env.PORT || 8444;

export default class Main {

    private taskRunner: TaskRunner = new TaskRunner();
    private openRoute: OpenRoute = new OpenRoute();
    private closeRoute: CloseRoute = new CloseRoute();
    private statusRoute: StatusRoute = new StatusRoute();
    private weatherRoute: WeatherRoute = new WeatherRoute();
    private moisterRoute: MoistureRoute = new MoistureRoute();
    private databaseService: DatabaseService = new DatabaseService(this.taskRunner);
    private server: express.Application;
    private fs: any;
    private httpsServer: any;

    constructor(
    ) {
        this.fs = require('fs'); 
        this.server = express();

        var privateKey = this.fs.readFileSync('sslcert/server.key');
        var certificate = this.fs.readFileSync('sslcert/server.crt');

        var credentials = {key: privateKey, cert: certificate};

        var https = require('https');
        this.config();

        this.httpsServer = https.createServer(credentials, this.server).listen(8443);

        
        this.weatherRoute.routes(this.server);
        this.moisterRoute.routes(this.server);

        for (var i=1; i<9; i++)
        {
            this.openRoute.routes(this.server, String(i) );
            this.closeRoute.routes(this.server, String(i));
            this.statusRoute.routes(this.server, String(i));
        }
        this.openRoute.routes(this.server, 'all');
        this.closeRoute.routes(this.server, 'all');
        this.statusRoute.routes(this.server, 'all');

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
