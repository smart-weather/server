"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var StatusRoute = /** @class */ (function () {
    function StatusRoute() {
    }
    StatusRoute.prototype.routes = function (app) {
        app.route("/status")
            .get(function (req, res) {
            axios_1.default.get("http://192.168.178.40:8090/status").then(function (result) {
                console.log(result);
                var status = result.data;
                console.log(status);
                res.status(200).send(status === "OPENED" ? "ON" : "OFF");
            }).catch(function (err) {
                console.error(err);
                res.status(500).send(JSON.stringify(err));
            });
        });
    };
    return StatusRoute;
}());
exports.default = StatusRoute;
//# sourceMappingURL=status.route.js.map