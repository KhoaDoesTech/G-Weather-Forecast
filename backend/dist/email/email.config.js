"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailTransport = void 0;
const nodemailer = require("nodemailer");
const createEmailTransport = () => {
    return nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: false,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
    });
};
exports.createEmailTransport = createEmailTransport;
//# sourceMappingURL=email.config.js.map