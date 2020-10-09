"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var open_route_1 = __importDefault(require("./routes/open.route"));
var close_route_1 = __importDefault(require("./routes/close.route"));
var status_route_1 = __importDefault(require("./routes/status.route"));
var bodyparser = __importStar(require("body-parser"));
var portNumber = 8090;
var Main = /** @class */ (function () {
    function Main() {
        this.openRoute = new open_route_1.default();
        this.closeRoute = new close_route_1.default();
        this.statusRoute = new status_route_1.default();
        this.server = express_1.default();
        this.config();
        this.openRoute.routes(this.server);
        this.closeRoute.routes(this.server);
        this.statusRoute.routes(this.server);
    }
    Main.prototype.config = function () {
        this.server.use(bodyparser.json());
    };
    Main.prototype.run = function (argv) {
        this.server.listen(portNumber, function () {
            console.log("Server listen on port: " + portNumber);
        });
    };
    return Main;
}());
exports.default = Main;
var main = new Main();
main.run(process.argv);
//# sourceMappingURL=main.js.map