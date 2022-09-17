import { CourierClient } from "@trycourier/courier";
require('dotenv').config();
import { Request, Response, Router } from "express";
const router = Router();
router.post('/send', async (req: Request, res: Response, next) => {
    const { message, email, first_name, last_name, title } = req.body;
    if (!!message && !!email && !!first_name && !!last_name && !!title) {
        const courier = CourierClient(
            { authorizationToken: process.env.COURIER_AUTH_TOKEN });

        const data = await courier.send({
            message: {

                to: {
                    email: "udochukwukaonyela@gmail.com"
                },
                content: {
                    title: title,
                    body: `Hi, I'm ${first_name} ${last_name},\n ${message} \n Here's my email: ${email} \n you can contact me on this email.`,

                }
            }
        });
        return res.status(200).json({ message: "Message sent successfully", data });
    }
    else {
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if (!first_name) {
            return res.status(400).json({ message: "First name is required" });
        }
        if (!last_name) {
            return res.status(400).json({ message: "Last name is required" });
        }
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }
        else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    }
})
module.exports = router;