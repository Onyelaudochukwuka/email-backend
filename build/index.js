"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const server = {};
const Options = { limit: "10mb", extended: true };
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define routes
app.use('/message', require("./routes/message"));
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`port started on Port ${PORT}`));
