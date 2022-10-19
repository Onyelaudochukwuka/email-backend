import { CourierClient } from "@trycourier/courier";
require("dotenv").config();
import { Request, Response, Router } from "express";
import { body } from "express-validator";
const router = Router();
const { SendMail, sendMessageOnly } = require("../controllers/message");
router.post(
    "/send",
    body("message", "A message from the user is required").isString(),
    body("message", "Field Cannot be empty").notEmpty(),
    body("user_email", "An email from the user is required").isEmail(),
    body("user_email", "Field Cannot be empty").notEmpty(),
    body("first_name", "The first Name of the user is required").isString(),
    body("first_name", "Field Cannot be empty").notEmpty(),
    body("last_name", "The last name is required").isString(),
    body("last_name", "Field Cannot be empty").notEmpty(),
    body("title", "Your message must have a title").isString(),
    body("title", "Field Cannot be empty").notEmpty(),
    body("my_email", "An email from user is required").isEmail(),
    body("my_email", "Field Cannot be empty").notEmpty(),
    SendMail,
);

router.post(
    "/send/messageOnly",
    body("message", "A message from the user is required").isString(),
    body("message", "Field Cannot be empty").notEmpty(),
    body("user_email", "An email from the user is required").isEmail(),
    body("user_email", "Field Cannot be empty").notEmpty(),
    body("user_name", "The last name is required").isString(),
    body("user_name", "Field Cannot be empty").notEmpty(),
    body("my_email", "An email from user is required").isEmail(),
    body("my_email", "Field Cannot be empty").notEmpty(),
    sendMessageOnly,
);
module.exports = router;
