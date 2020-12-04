"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardModule = void 0;
const common_1 = require("@nestjs/common");
const scorecard_controller_1 = require("./scorecard.controller");
const scorecard_service_1 = require("./scorecard.service");
const mongoose_1 = require("@nestjs/mongoose");
const scorecard_schema_1 = require("../../schemas/scorecard.schema");
const exam_module_1 = require("../exam/exam.module");
let ScorecardModule = class ScorecardModule {
};
ScorecardModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => exam_module_1.ExamModule),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Scorecards', schema: scorecard_schema_1.ScorecardSchema },
            ]),
        ],
        controllers: [scorecard_controller_1.ScorecardController],
        providers: [scorecard_service_1.ScorecardService],
        exports: [scorecard_service_1.ScorecardService],
    })
], ScorecardModule);
exports.ScorecardModule = ScorecardModule;
//# sourceMappingURL=scorecard.module.js.map