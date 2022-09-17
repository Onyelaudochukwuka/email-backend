"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const courier_1 = require("@trycourier/courier");
require('dotenv').config();
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/send', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, email, first_name, last_name, title } = req.body;
    if (!!message && !!email && !!first_name && !!last_name && !!title) {
        const courier = (0, courier_1.CourierClient)({ authorizationToken: process.env.COURIER_AUTH_TOKEN });
        const data = yield courier.send({
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
        if (!email) {
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
}));
module.exports = router;
