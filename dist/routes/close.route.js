"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var OpenRoute = /** @class */ (function () {
    function OpenRoute() {
    }
    OpenRoute.prototype.routes = function (app) {
        app.route("/close")
            .get(function (req, res) {
            axios_1.default.get("http://192.168.178.40:8090/close").then(function (result) {
                console.log(result);
                res.status(200).send("OFF");
                //res.status(200).send(JSON.stringify(result));
            }).catch(function (err) {
                console.error(err);
                res.status(500).send(JSON.stringify(err));
            });
        });
    };
    return OpenRoute;
}());
exports.default = OpenRoute;
//# sourceMappingURL=close.route.js.map