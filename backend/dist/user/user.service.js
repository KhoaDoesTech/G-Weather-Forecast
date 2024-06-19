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
const email_service_1 = require("../email/email.service");
const user_repository_1 = require("../user/user.repository");
let UserService = class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async register(email, city) {
        let foundUser = await this.userRepository.findByEmail(email);
        if (foundUser) {
            if (foundUser.isConfirmed) {
                foundUser = await this.userRepository.addCityToUser(email, city);
                foundUser = await this.userRepository.updateUser(email, {
                    subscribed: true,
                });
                await this.emailService.sendSuccessEmail(email, city);
            }
            else {
                await this.emailService.sendConfirmationEmail(email);
            }
        }
        else {
            foundUser = await this.userRepository.createUser(email, city);
            await this.emailService.sendConfirmationEmail(email);
        }
        return foundUser;
    }
    async confirmEmail(email) {
        const user = await this.userRepository.updateUser(email, {
            isConfirmed: true,
            subscribed: true,
        });
        await this.emailService.sendSuccessEmail(email, user.city[0]);
        await this.emailService.scheduleDailyWeatherEmails();
        return user;
    }
    async unsubscribe(email) {
        return await this.userRepository.updateUser(email, { subscribed: false });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map