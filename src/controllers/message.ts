import { CourierClient } from "@trycourier/courier";
require("dotenv").config();
import type { Request, Response, Router } from "express";
import { ValidationError, validationResult } from "express-validator";
interface Res {
    message: string;
    success: boolean;
    data?: {
        requestId: string;
    };
    errors?: ValidationError[];
}
interface Req {
    message: string;
    user_email: string;
    first_name: string;
    last_name: string;
    title: string;
    my_email: string;
}
interface MessageOnlyReq {
    message: string;
    user_email: string;
    user_name: string;
    my_email: string;
}

exports.SendMail = async (req: Request<Req>, res: Response<Res>) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array(),
                success: false,
                message: "Invalid data",
            });
    }
    const { message, user_email, first_name, last_name, title, my_email }: Req =
        req.body;
    const courier = CourierClient({
        authorizationToken: process.env.COURIER_AUTH_TOKEN,
    });

    const data = await courier.send({
        message: {
            to: {
                email: my_email,
            },
            content: {
                title: title,
                body: `Hi, I'm ${first_name} ${last_name},\n ${message} \n Here's my email: ${user_email} \n you can contact me on this email.`,
            },
        },
    });
    return res
        .status(200)
        .json({ success: true, message: "Message sent successfully", data });
};
exports.sendMessageOnly = async (
    req: Request<MessageOnlyReq>,
    res: Response<Res>,
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array(),
                success: false,
                message: "Invalid data",
            });
    }
    const { message, user_email, user_name, my_email }: MessageOnlyReq =
        req.body;
    const courier = CourierClient({
        authorizationToken: process.env.COURIER_AUTH_TOKEN,
    });

    const data = await courier.send({
        message: {
            to: {
                email: my_email,
            },
            content: {
                title: "Message from portfolio",
                body: `Hi, I'm ${user_name},\n ${message} \n Here's my email: ${user_email} \n you can contact me on this email.`,
            },
        },
    });
    return res
        .status(200)
        .json({ success: true, message: "Message sent successfully", data });
};
