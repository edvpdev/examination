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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const exam_1 = require("../../interfaces/exam");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    async getAllExams(pageNumber = 1, pageSize = 0) {
        const count = await this.examService.getCount();
        pageNumber =
            typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
        pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
        const res = await this.examService.getAllExams(pageNumber, pageSize);
        return { res: res, total: count };
    }
    async getExam(id) {
        return this.examService.getExam(id);
    }
    createExam(exam) {
        return this.examService.createExam(exam);
    }
    updateExam(examID, exam) {
        return this.examService.updateExam(examID, exam);
    }
    deleteExam(examID) {
        return this.examService.deleteExam(examID);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('pageNumber')),
    __param(1, common_1.Query('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllExams", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getExam", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_1.Exam]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "createExam", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "updateExam", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "deleteExam", null);
ExamController = __decorate([
    common_1.Controller('exams'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
exports.ExamController = ExamController;
//# sourceMappingURL=exam.controller.js.map