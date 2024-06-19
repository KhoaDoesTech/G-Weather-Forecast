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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(email, city) {
        const user = new this.userModel({ email, city: [city] });
        return await user.save();
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async addCityToUser(email, city) {
        return await this.userModel
            .findOneAndUpdate({ email }, { $addToSet: { city } }, { new: true })
            .exec();
    }
    async findAllSubscribedUsers() {
        return await this.userModel.find({ subscribed: true }).exec();
    }
    async updateUser(email, update) {
        return await this.userModel
            .findOneAndUpdate({ email }, update, { new: true })
            .exec();
    }
    async deleteUser(email) {
        return await this.userModel.findOneAndDelete({ email }).exec();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map