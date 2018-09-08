"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.config();
        this.setRoutes();
    }
    App.prototype.config = function () {
        //Setup Cors and access control information here
        this.app.use(bodyParser.json({ limit: '500mb' }));
        this.app.use(bodyParser({ limit: '50mb' }));
    };
    App.prototype.setRoutes = function () {
        // Set up the app routes here
    };
    return App;
}());
exports.default = new App().app;
