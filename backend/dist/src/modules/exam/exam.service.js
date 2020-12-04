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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const questions_service_1 = require("../questions/questions.service");
const scorecard_service_1 = require("./../scorecard/scorecard.service");
let ExamService = class ExamService {
    constructor(examModel, questionService, scorecardService) {
        this.examModel = examModel;
        this.questionService = questionService;
        this.scorecardService = scorecardService;
    }
    async getAllExams(pageNumber, pageSize) {
        return await this.examModel
            .find({})
            .sort({ title: 'asc' })
            .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
            .limit(pageSize)
            .select(['_id', 'title', 'questions'])
            .populate({
            path: 'exams',
            select: 'title _id',
        })
            .exec();
    }
    async getCount() {
        return this.examModel.find().countDocuments();
    }
    async getExam(examID) {
        console.log(examID);
        return this.examModel.findOne({ _id: examID }).populate('questions').exec();
    }
    async createExam(exam) {
        const count = await this.examModel
            .find({ title: exam.title })
            .countDocuments();
        if (count > 0) {
            throw new common_1.BadRequestException('Exam with given title already exists');
        }
        if (exam.questions.length) {
            exam.questions = await this.questionService.validateReceivedQuestions(exam.questions);
        }
        const newExam = this.examModel(exam);
        await newExam.save();
        exam.questions.length &&
            (await this.questionService.addExamToQuestions(exam.questions, newExam));
        return newExam.toObject({ versionKey: false });
    }
    async updateExam(id, exam) {
        const { title } = exam;
        const oldExam = await this.examModel
            .findById({
            _id: id,
        })
            .populate('questions');
        if (!oldExam) {
            throw new common_1.BadRequestException('Exam with such an ID does not exist');
        }
        const examWithGivenTitle = await this.examModel.findOne({
            title: title,
            _id: { $ne: id },
        });
        if (examWithGivenTitle) {
            throw new common_1.BadRequestException('Exam with such title already exists');
        }
        const newQuestions = await this.questionService.validateReceivedQuestions(exam.questions);
        const oldQuestions = [...exam.questions];
        const [removedQuestions, addedQuestions,] = this.questionService.compareOldToNewQuestions(oldQuestions, newQuestions);
        oldExam.title = title || oldExam.title;
        if (addedQuestions.length === 0 && removedQuestions.length === 0) {
            await oldExam.save();
            return oldExam;
        }
        else {
            await this.questionService.addExamToQuestions(addedQuestions, oldExam);
            await this.questionService.removeExamFromQuestions(removedQuestions, oldExam._id);
            await oldExam.save();
            return oldExam;
        }
    }
    async deleteExam(examID) {
        var e_1, _a;
        const exam = this.examModel.findOne({ _id: examID });
        if (exam.questions.length) {
            throw new common_1.BadRequestException('Cant delete exam which has questions assigned.');
        }
        else {
            console.log('Delete Exam ID:', examID);
            try {
                for (var _b = __asyncValues(this.scorecardService.findIterator({
                    exam: examID,
                })), _c; _c = await _b.next(), !_c.done;) {
                    const scorecardDoc = _c.value;
                    console.log('Deleting scorecard document as well: ', scorecardDoc._id);
                    await scorecardDoc.deleteOne();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return await this.examModel.findOneAndDelete({ _id: examID });
        }
    }
    findIterator(filters, projection, options) {
        return this.examModel.find(filters, projection, options);
    }
    async findOne(filters) {
        return await this.examModel.findOne(filters);
    }
    async removeQuestionFromExam(examID, questionID) {
        return await this.examModel.findOneAndUpdate({ _id: examID }, { $pull: { questions: questionID } });
    }
    async removeQuestionFromExams(exams, questionID) {
        var e_2, _a;
        try {
            for (var _b = __asyncValues(this.examModel.find({
                title: { $in: exams.map((exam) => exam.title) },
            })), _c; _c = await _b.next(), !_c.done;) {
                const examDoc = _c.value;
                await this.removeQuestionFromExam(examDoc._id, questionID);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    async addQuestionToExams(exams, question) {
        var e_3, _a;
        try {
            for (var _b = __asyncValues(this.examModel.find({
                title: { $in: exams.map((exam) => exam.title) },
            })), _c; _c = await _b.next(), !_c.done;) {
                const examDoc = _c.value;
                await this.addQuestionForExam(examDoc._id, question);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    async addQuestionForExam(examID, question) {
        return await this.examModel.updateOne({ _id: examID }, { $push: { questions: question } });
    }
    async validateReceivedExams(exams) {
        var e_4, _a;
        const foundExams = [];
        if (exams.length) {
            try {
                for (var _b = __asyncValues(this.examModel.find({
                    title: { $in: exams.map((exam) => exam === null || exam === void 0 ? void 0 : exam.title) },
                })), _c; _c = await _b.next(), !_c.done;) {
                    const doc = _c.value;
                    foundExams.push(doc);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (foundExams.length !== exams.length ||
                foundExams.some((exam) => exam === null)) {
                throw new common_1.BadRequestException('Provided partial exam objects in question body are invalid. Please make sure such exams exist or create exams separately.');
            }
        }
        return foundExams;
    }
    compareOldToNewExams(oldExams, newExams) {
        let [removedArr, addedArr] = [[], []];
        if (newExams.length === 0)
            return [[...oldExams], [...addedArr]];
        removedArr = oldExams.filter((oldExam) => !newExams.some((newExam) => {
            return newExam.title === oldExam.title;
        }));
        addedArr = newExams.filter((newExam) => !oldExams.some((oldExam) => {
            return newExam.title === oldExam.title;
        }));
        return [[...removedArr], [...addedArr]];
    }
};
ExamService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Exams')),
    __param(1, common_1.Inject(common_1.forwardRef(() => questions_service_1.QuestionsService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => scorecard_service_1.ScorecardService))),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, questions_service_1.QuestionsService,
        scorecard_service_1.ScorecardService])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map