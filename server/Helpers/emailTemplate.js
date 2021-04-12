import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Email from "./email";

dotenv.config();
const {EMAIL_ADDRESS, EMAIL_PASSWORD} =process.env;
const transporter = nodemailer.createTransport({
    service:"gmail",
    secure:"false",
    auth:{
        user:EMAIL_ADDRESS,
        pass:EMAIL_PASSWORD
    }
})


class EmailHelper {
    static async userWelcomeEmail(user){
        const info = await transporter.sendMail(Email.WelcomeEmail(user));
    }
}

export default EmailHelper;