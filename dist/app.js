"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("./config/constants");
const database_1 = __importDefault(require("./config/database"));
const examRoute_1 = require("./routes/examRoute");
const app = (0, express_1.default)();
const port = parseInt(constants_1.PORT) || 5000;
app.use(body_parser_1.default.json());
// check if app works
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
database_1.default.sync({ force: true }).then(() => {
    console.log('Database and tables synchronized.');
});
app.use(examRoute_1.examRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
