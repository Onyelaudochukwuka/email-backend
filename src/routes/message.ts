import { CourierClient } from "@trycourier/courier";
require('dotenv').config();
import { Request, Response, Router } from "express";
import { body } from 'express-validator';
const router = Router();
const { SendMail } = require("../controllers/message");
router.post('/send',
    body('message').isString().notEmpty(),
    body('user_email').isEmail().notEmpty(),
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    body('title').isString().notEmpty(),
    body('my_email').isEmail().notEmpty(),
    SendMail)
module.exports = router;