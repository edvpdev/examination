"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const exam_module_1 = require("./modules/exam/exam.module");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const questions_module_1 = require("./modules/questions/questions.module");
const scorecard_module_1 = require("./modules/scorecard/scorecard.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const get_user_middleware_1 = require("./middlewares/get-user.middleware");
const category_controller_1 = require("./modules/category/category.controller");
const questions_controller_1 = require("./modules/questions/questions.controller");
const scorecard_controller_1 = require("./modules/scorecard/scorecard.controller");
const exam_controller_1 = require("./modules/exam/exam.controller");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(get_user_middleware_1.GetUserMiddleware)
            .forRoutes(category_controller_1.CategoryController, questions_controller_1.QuestionsController, scorecard_controller_1.ScorecardController, exam_controller_1.ExamController);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            questions_module_1.QuestionsModule,
            exam_module_1.ExamModule,
            category_module_1.CategoryModule,
            scorecard_module_1.ScorecardModule,
            mongoose_1.MongooseModule.forRoot(`${process.env.MONGO_URI}`),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'frontend'),
                exclude: ['/api*']
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map