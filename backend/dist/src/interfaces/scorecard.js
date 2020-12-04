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
exports.Scorecard = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const exam_1 = require("./exam");
class Scorecard extends mongoose_1.Document {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", exam_1.Exam)
], Scorecard.prototype, "exam", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Scorecard.prototype, "status", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], Scorecard.prototype, "bonusScore", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], Scorecard.prototype, "totalScore", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Scorecard.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Scorecard.prototype, "user", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Scorecard.prototype, "answers", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Scorecard.prototype, "title", void 0);
exports.Scorecard = Scorecard;
//# sourceMappingURL=scorecard.js.map