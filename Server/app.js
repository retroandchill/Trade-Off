"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the environmental variables from the configuration file
require('dotenv').config();
var app_1 = require("./models/app");
var port = Number(process.env.PORT) || 3000;
app_1.default.set('port', port);
app_1.default.listen(app_1.default.get('port'), function () {
    console.log('Listening at localhost:${port}/');
});
