"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("./helmet"));
//import logToMongo from './logToMongo';
const bodyParser_1 = __importDefault(require("./bodyParser"));
exports.default = (app) => {
    (0, bodyParser_1.default)(app);
    (0, helmet_1.default)(app);
    //logToMongo(app);
};
