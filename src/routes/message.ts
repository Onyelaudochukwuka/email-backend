import { CourierClient } from "@trycourier/courier";
require('dotenv').config();
import { Request, Response, Router } from "express";
const router = Router();
interface Res {
    message: string;
    success: boolean;
    data?: {
        requestId: string;
    }
}
interface Req{
    message: string;
    user_email: string;
    first_name: string;
    last_name: string;
    title: string;
    my_email: string;
}
router.post('/send', async (req: Request<Req>, res: Response<Res>, next) => {
    const { message, user_email, first_name, last_name, title, my_email }:Req = req.body;
    if (!!message && !!user_email && !!first_name && !!last_name && !!title) {
        const courier = CourierClient(
            { authorizationToken: process.env.COURIER_AUTH_TOKEN });

        const data = await courier.send({
            message: {

                to: {
                    email: my_email
                },
                content: {
                    title: title,
                    body: `Hi, I'm ${first_name} ${last_name},\n ${message} \n Here's my email: ${user_email} \n you can contact me on this email.`,

                }
            }
        });
        return res.status(200).json({ success: true, message: "Message sent successfully", data });
    }
    else {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }
})
module.exports = router;