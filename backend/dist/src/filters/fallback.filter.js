"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let FallbackExceptionFilter = class FallbackExceptionFilter {
    catch(exception, host) {
        console.log('fallback exception handler triggered', JSON.stringify(exception));
        const ctx = host.switchToHttp(), response = ctx.getResponse();
        return response.status(500).json({
            statusCode: 500,
            createdBy: 'FallbackExceptionFilter',
            errorMessage: exception.message
                ? exception.message
                : 'Unexpected error ocurred',
        });
    }
};
FallbackExceptionFilter = __decorate([
    common_1.Catch()
], FallbackExceptionFilter);
exports.FallbackExceptionFilter = FallbackExceptionFilter;
//# sourceMappingURL=fallback.filter.js.map