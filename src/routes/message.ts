import { CourierClient } from "@trycourier/courier";
require('dotenv').config();
import { Request, Response, Router } from "express";
const router = Router();
router.post('/send', async (req: Request, res: Response, next) => {
    const { body, email } = req.body;
    const courier = CourierClient(
        { authorizationToken: process.env.COURIER_AUTH_TOKEN });

    const data = await courier.send({
        message: {
            to: {
                email: "udochukwukaonyela@gmail.com"
            },
            content: {
                title: "Welcome to Courier!",
                body: "Want to hear a joke? {{joke}}"
            },
            data: {
                joke: "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves"
            },
        }
    });
    console.log(data);
    res.status(200).json({ message: "Message sent successfully", data });
})
module.exports = router;