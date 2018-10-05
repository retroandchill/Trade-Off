"use strict";
//TODO: Add CORS security
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = __importStar(require("path"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.sendFile(path.resolve("../Client/views/MainPage.html"));
});
router.get('/login', function (req, res) {
    res.sendFile(path.resolve("../Client/views/Login.html"));
});
router.get('/stocks', function (req, res) {
    res.sendFile(path.resolve("../Client/views/StockInfo.html"));
});
exports.TrafficRouter = router;
