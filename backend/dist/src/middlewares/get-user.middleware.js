"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let GetUserMiddleware = class GetUserMiddleware {
    use(req, res, next) {
        const authJwtToken = req.headers.authorization;
        if (!authJwtToken) {
            next();
            return;
        }
        try {
            const user = jwt.verify(authJwtToken, process.env.JWT_SECRET);
            console.log(user);
            if (user) {
                console.log('Found user details in JWT: ', user);
                res['user'] = user;
            }
        }
        catch (err) {
            console.log('Error handling authentication JWT: ', err);
        }
        next();
    }
};
GetUserMiddleware = __decorate([
    common_1.Injectable()
], GetUserMiddleware);
exports.GetUserMiddleware = GetUserMiddleware;
//# sourceMappingURL=get-user.middleware.js.map