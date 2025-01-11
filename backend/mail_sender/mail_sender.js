import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sendMail = async ({email, subject, html}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error", error);
        } else {
            console.log('Email sent: ', info.response);
        }
    })
};

export default sendMail;




    // const mailOptions = {
    //     from: process.env.GMAIL_USER,
    //     to: 'kyntt882@gmail.com',
    //     subject: 'Hello from OpportunityHub',
    //     text: 'Hello world from OpportunityHub',
    //     html: '<h1>Welcome</h1><p>PEEKABOBO!!</p>',
    //     alternatves: [
    //         {
    //             constentType: 'text/x-web-markdown',
    //             conten: '**SURPRISED?**'
    //         }
    //     ]
    // };