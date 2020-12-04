"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModule = void 0;
const common_1 = require("@nestjs/common");
const exam_controller_1 = require("./exam.controller");
const exam_service_1 = require("./exam.service");
const mongoose_1 = require("@nestjs/mongoose");
const exam_schema_1 = require("../../schemas/exam.schema");
const questions_module_1 = require("../questions/questions.module");
const scorecard_module_1 = require("../scorecard/scorecard.module");
let ExamModule = class ExamModule {
};
ExamModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => questions_module_1.QuestionsModule),
            common_1.forwardRef(() => scorecard_module_1.ScorecardModule),
            mongoose_1.MongooseModule.forFeature([{ name: 'Exams', schema: exam_schema_1.ExamSchema }]),
        ],
        controllers: [exam_controller_1.ExamController],
        providers: [exam_service_1.ExamService],
        exports: [exam_service_1.ExamService],
    })
], ExamModule);
exports.ExamModule = ExamModule;
//# sourceMappingURL=exam.module.js.map