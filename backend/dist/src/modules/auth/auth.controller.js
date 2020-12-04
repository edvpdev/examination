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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(email, plaintextPassword) {
        const user = await this.userService.findUser(email);
        if (!user) {
            console.log('User does exist on the database.');
            throw new common_1.UnauthorizedException('User with such email does not exist');
        }
        const doMatch = await bcryptjs.compare(plaintextPassword, user.password);
        if (doMatch) {
            const authJwtToken = jwt.sign({ fullName: user.fullName, roles: user.roles }, process.env.JWT_SECRET);
            return {
                authJwtToken,
                user: { fullName: user.fullName, roles: user.roles },
            };
        }
        else {
            throw new common_1.UnauthorizedException('Incorrect Password');
        }
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body('email')),
    __param(1, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map