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
exports.QuestionsController = void 0;
const questions_service_1 = require("./questions.service");
const common_1 = require("@nestjs/common");
const question_1 = require("../../interfaces/question");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async getAllQuestions(pageNumber = 1, pageSize = 0) {
        const count = await this.questionsService.getCount();
        pageNumber =
            typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
        pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
        const res = await this.questionsService.getAllQuestions(pageNumber, pageSize);
        return { res: res, total: count };
    }
    async getQuestion(id) {
        console.log(id);
        return this.questionsService.getQuestion(id);
    }
    async getQuestionsByExamID(examID) {
        return this.questionsService.getQuestionsByExamID(examID);
    }
    async getQuestionsByCategoryID(categoryID) {
        return this.questionsService.getQuestionsByCategoryID(categoryID);
    }
    createQuestion(question) {
        return this.questionsService.createQuestion(question);
    }
    updateQuestion(questionID, question) {
        return this.questionsService.updateQuestion(questionID, question);
    }
    deleteQuestion(questionID) {
        return this.questionsService.deleteQuestion(questionID);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('pageNumber')),
    __param(1, common_1.Query('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getAllQuestions", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestion", null);
__decorate([
    common_1.Get('exam/:examID'),
    __param(0, common_1.Param('examID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionsByExamID", null);
__decorate([
    common_1.Get('categories/:categoryID'),
    __param(0, common_1.Param('categoryID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionsByCategoryID", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_1.IQuestion]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createQuestion", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_1.IQuestion]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateQuestion", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "deleteQuestion", null);
QuestionsController = __decorate([
    common_1.Controller('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map