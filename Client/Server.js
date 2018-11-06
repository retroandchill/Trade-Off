"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the environmental variables from the configuration file
const App_1 = __importDefault(require("./App"));
const port = 80;
App_1.default.set('port', port);
App_1.default.listen(App_1.default.get('port'), () => {
    console.log('Listening at localhost:' + port + "/");
});
