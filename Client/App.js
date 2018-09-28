"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var TrafficRouter_1 = require("./routes/TrafficRouter");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
        this.setRoutes();
    }
    App.prototype.config = function () {
        //Setup Cors and access control information here
        this.app.use(body_parser_1.default.json({ limit: '500mb' }));
        this.app.use(body_parser_1.default({ limit: '50mb' }));
    };
    App.prototype.setRoutes = function () {
        // Set Express to always serve the static JS and CSS files in the view folder
        this.app.use('/css', express_1.default.static(__dirname + '/views/css'));
        this.app.use('/js', express_1.default.static(__dirname + '/views/js'));
        this.app.use('/assets', express_1.default.static(__dirname + '/views/assets'));
        this.app.use('/semantic', express_1.default.static(__dirname + '/semantic/dist'));
        // Plug in the traffic routers into the server
        this.app.use('/', TrafficRouter_1.TrafficRouter);
    };
    return App;
}());
exports.default = new App().app;
