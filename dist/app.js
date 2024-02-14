"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./config/constants");
const middlewares_1 = __importDefault(require("./middlewares"));
const examRoute_1 = require("./routes/examRoute");
const app = (0, express_1.default)();
const port = parseInt(constants_1.PORT) || 5000;
(0, middlewares_1.default)(app);
// check if app works
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
app.use(examRoute_1.examRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
