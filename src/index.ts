import express, { Application } from "express";
require("dotenv").config();

interface Server {
    init?: () => void;
}
const server: Server = {};
type Options = {
    limit: string;
    extended: boolean;
};
const Options = { limit: "10mb", extended: true };

const app: Application = express();
app.use(express.json());
// Define routes
app.use('/message', require("./routes/message"));
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`port started on Port ${PORT}`))