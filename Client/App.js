"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const TrafficRouter_1 = require("./routes/TrafficRouter");
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.setRoutes();
    }
    config() {
        //Setup Cors and access control information here
        this.app.use(body_parser_1.default.json());
    }
    setRoutes() {
        // Set Express to always serve the static JS and CSS files in the view folder
        this.app.use('/css', express_1.default.static(__dirname + '/views/css'));
        this.app.use('/js', express_1.default.static(__dirname + '/views/js'));
        this.app.use('/assets', express_1.default.static(__dirname + '/views/assets'));
        this.app.use('/semantic', express_1.default.static(__dirname + '/semantic/dist'));
        // Plug in the traffic routers into the server
        this.app.use('/', TrafficRouter_1.TrafficRouter);
    }
}
exports.default = new App().app;
