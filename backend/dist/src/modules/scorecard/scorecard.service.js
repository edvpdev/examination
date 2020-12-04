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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const exam_service_1 = require("../exam/exam.service");
let ScorecardService = class ScorecardService {
    constructor(scorecardModel, examService) {
        this.scorecardModel = scorecardModel;
        this.examService = examService;
    }
    async getAllScorecards(pageNumber, pageSize, exclude) {
        console.log(exclude);
        return this.scorecardModel
            .find({
            status: { $ne: exclude },
        })
            .sort({ title: 'asc' })
            .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
            .limit(pageSize)
            .select(['_id', 'title', 'createdAt', 'user', 'status']);
    }
    async getCount(exclude) {
        return this.scorecardModel
            .find({
            status: { $ne: exclude },
        })
            .countDocuments();
    }
    async getScorecard(id) {
        return this.scorecardModel
            .findOne({ _id: id })
            .populate({
            path: 'exams',
            select: 'title _id',
        })
            .select('-__v -updatedAt');
    }
    async createScorecard(examID, user, answers) {
        const exam = await this.examService.getExam(examID);
        if (exam === null) {
            throw new common_1.BadRequestException('Scorecard for non-existant exam cannot be created');
        }
        const newScorecard = {
            user: user,
            status: 'Ready for review',
            answers: answers,
            exam: exam,
            bonusScore: 0,
            totalScore: 0,
            notes: '',
            title: `${exam === null || exam === void 0 ? void 0 : exam.title} - ${user}`,
        };
        const createdScorecard = this.scorecardModel(newScorecard);
        await createdScorecard.save();
        return createdScorecard.toObject({ versionKey: false });
    }
    async updateScorecard(scorecardID, scorecard, type) {
        const { title, user, answers, notes, bonusScore } = scorecard;
        console.log(scorecard);
        if (!this.validateAnswers(answers)) {
            throw new common_1.BadRequestException('Answers array is not valid.');
        }
        const oldScorecard = await this.scorecardModel
            .findOne({ _id: scorecardID })
            .populate('exam')
            .exec();
        if (oldScorecard.exam.questions.length !== answers.length) {
            throw new common_1.BadRequestException('Fewer answers are provided as there are questions for this scorecard');
        }
        if (oldScorecard) {
            oldScorecard.title = title || oldScorecard.title;
            oldScorecard.answers = [...answers];
            oldScorecard.status = type === 'save' ? oldScorecard.status : 'Reviewed';
            oldScorecard.notes = notes || oldScorecard.notes;
            oldScorecard.bonusScore = bonusScore || oldScorecard.bonusScore;
            oldScorecard.exam = oldScorecard.exam;
            oldScorecard.user = user || oldScorecard.user;
            oldScorecard.totalScore =
                this.calculateTotalScore(answers, bonusScore) || 0;
            const updatedScorecard = await oldScorecard.save();
            return updatedScorecard;
        }
        else {
            throw new common_1.BadRequestException('Failed updating scorecard');
        }
    }
    async deleteScorecard(scorecardID) {
        return this.scorecardModel.findOneAndDelete({ _id: scorecardID });
    }
    findIterator(filters, projection, options) {
        return this.scorecardModel.find(filters, projection, options);
    }
    async findOneAndDelete(filters) {
        return await this.scorecardModel.findOneAndDelete(filters);
    }
    calculateTotalScore(answers, bonusScore) {
        const score = answers.reduce((a, b) => {
            return a + b.givenScore;
        }, 0);
        return score + bonusScore;
    }
    validateAnswers(answers) {
        const isValid = answers.every((answer) => {
            const { title, questionText, questionAnswer, maxScore, givenScore, category, } = answer;
            if (typeof title !== 'string' ||
                typeof questionText !== 'string' ||
                typeof questionAnswer !== 'string' ||
                typeof category !== 'string') {
                return false;
            }
            if (isNaN(maxScore) || isNaN(givenScore)) {
                return false;
            }
            return true;
        });
        return isValid;
    }
};
ScorecardService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Scorecards')),
    __param(1, common_1.Inject(common_1.forwardRef(() => exam_service_1.ExamService))),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, exam_service_1.ExamService])
], ScorecardService);
exports.ScorecardService = ScorecardService;
//# sourceMappingURL=scorecard.service.js.map