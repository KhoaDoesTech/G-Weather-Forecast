"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const nodemailer = require("nodemailer");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async sendConfirmationEmail(email) {
        const transporter = nodemailer.createTransport({
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
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirm your email',
            text: `Please confirm your email by clicking the following link: http://localhost:3000/user/confirm?email=${email}`,
        };
        await transporter.sendMail(mailOptions);
    }
    async register(email, city) {
        let user = await this.userRepository.findByEmail(email);
        if (user) {
            user = await this.userRepository.addCityToUser(email, city);
        }
        else {
            user = await this.userRepository.createUser(email, city);
            await this.sendConfirmationEmail(email);
        }
        return user;
    }
    async confirmEmail(email) {
        return await this.userRepository.updateUser(email, { isConfirmed: true });
    }
    async unsubscribe(email) {
        return await this.userRepository.updateUser(email, { subscribed: false });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map