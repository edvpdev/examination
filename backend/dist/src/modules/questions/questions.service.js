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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const exam_service_1 = require("../exam/exam.service");
const category_service_1 = require("../category/category.service");
let QuestionsService = class QuestionsService {
    constructor(examService, categoryService, questionModel) {
        this.examService = examService;
        this.categoryService = categoryService;
        this.questionModel = questionModel;
    }
    async getAllQuestions(pageNumber, pageSize) {
        return this.questionModel
            .find({})
            .sort({ title: 'asc' })
            .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
            .limit(pageSize)
            .select(['_id', 'title', 'exams', 'category'])
            .populate({
            path: 'exams',
            select: 'title _id',
        })
            .populate('category')
            .exec();
    }
    async getCount() {
        return this.questionModel.find().countDocuments();
    }
    async getQuestion(id) {
        return this.questionModel
            .findOne({ _id: id })
            .populate({
            path: 'exams',
            select: 'title _id',
        })
            .populate('category')
            .select('-__v -createdAt -updatedAt');
    }
    async getQuestionsByExamID(examID) {
        return this.questionModel.find({ exams: { $in: [examID] } });
    }
    async getQuestionsByCategoryID(categoryID) {
        return this.questionModel.find({ category: categoryID });
    }
    async createQuestion(question) {
        const count = await this.questionModel
            .find({ title: question.title })
            .countDocuments();
        if (count > 0) {
            throw new common_1.BadRequestException('Question with given title already exists');
        }
        question.category = await this.categoryService.validateReceivedCategory(question.category);
        question.exams = await this.examService.validateReceivedExams(question.exams);
        const newQuestion = this.questionModel(question);
        await newQuestion.save();
        question.exams.length &&
            (await this.examService.addQuestionToExams(question.exams, newQuestion));
        return newQuestion.toObject({ versionKey: false });
    }
    async updateQuestion(id, question) {
        const { title, questionText, maxScore } = question;
        const oldQuestion = await this.questionModel
            .findById({
            _id: id,
        })
            .populate('exams');
        if (!oldQuestion) {
            throw new common_1.BadRequestException('Question with such an ID does not exist');
        }
        const questionWithGivenTitle = await this.questionModel.findOne({
            title: title,
            _id: { $ne: id },
        });
        if (questionWithGivenTitle) {
            throw new common_1.BadRequestException('Question with such title already exists');
        }
        const newCategory = await this.categoryService.validateReceivedCategory(question.category);
        const newExams = await this.examService.validateReceivedExams(question.exams);
        const oldExams = [...oldQuestion.exams];
        oldQuestion.title = title || oldQuestion.title;
        oldQuestion.questionText = questionText || oldQuestion.questionText;
        oldQuestion.maxScore = maxScore || oldQuestion.maxScore;
        oldQuestion.exams = newExams;
        oldQuestion.category = newCategory || oldQuestion.category;
        const [removedExams, addedExams] = this.examService.compareOldToNewExams(oldExams, newExams);
        if (addedExams.length === 0 && removedExams.length === 0) {
            await oldQuestion.save();
            return oldQuestion;
        }
        else {
            await this.examService.addQuestionToExams(addedExams, oldQuestion);
            await this.examService.removeQuestionFromExams(removedExams, oldQuestion._id);
            await oldQuestion.save();
            return oldQuestion;
        }
    }
    async deleteQuestion(questionID) {
        const question = await this.questionModel
            .findOne({ _id: questionID })
            .populate('exams')
            .exec();
        question.exams.length &&
            (await this.examService.removeQuestionFromExams(question.exams, questionID));
        return await question.remove();
    }
    findIterator(filters, projection, options) {
        return this.questionModel.find(filters, projection, options);
    }
    async findOne(filters) {
        return await this.questionModel.findOne(filters);
    }
    async removeExamFromQuestion(questionID, examID) {
        return await this.questionModel.findOneAndUpdate({ _id: questionID }, { $pull: { exams: examID } });
    }
    async removeExamFromQuestions(questions, examID) {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(this.questionModel.find({
                title: { $in: questions.map((question) => question.title) },
            })), _c; _c = await _b.next(), !_c.done;) {
                const questionDoc = _c.value;
                await this.removeExamFromQuestion(questionDoc._id, examID);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    async addExamForQuestion(questionID, exam) {
        return await this.questionModel.updateOne({ _id: questionID }, { $push: { exams: exam } });
    }
    async addExamToQuestions(questions, exam) {
        var e_2, _a;
        try {
            for (var _b = __asyncValues(this.questionModel.find({
                title: { $in: questions.map((question) => question.title) },
            })), _c; _c = await _b.next(), !_c.done;) {
                const questionDoc = _c.value;
                await this.addExamForQuestion(questionDoc._id, exam);
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
    async validateReceivedQuestions(questions) {
        var e_3, _a;
        console.log(questions);
        const foundQuestions = [];
        if (questions.length) {
            try {
                for (var _b = __asyncValues(this.questionModel.find({
                    title: { $in: questions.map((question) => question === null || question === void 0 ? void 0 : question.title) },
                })), _c; _c = await _b.next(), !_c.done;) {
                    const doc = _c.value;
                    foundQuestions.push(doc);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            console.log(foundQuestions);
            if (foundQuestions.length !== questions.length ||
                foundQuestions.some((question) => question === null)) {
                throw new common_1.BadRequestException('Provided partial question objects in exam body are invalid. Please make sure such exams exist or create exams separately.');
            }
        }
        return foundQuestions;
    }
    compareOldToNewQuestions(oldQuestions, newQuestions) {
        let [removedArr, addedArr] = [[], []];
        if (newQuestions.length === 0)
            return [[...oldQuestions], [...addedArr]];
        removedArr = oldQuestions.filter((oldQuestion) => !newQuestions.some((newExam) => {
            return newExam.title === oldQuestion.title;
        }));
        addedArr = newQuestions.filter((newExam) => !oldQuestions.some((oldQuestion) => {
            return newExam.title === oldQuestion.title;
        }));
        return [[...removedArr], [...addedArr]];
    }
};
QuestionsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => exam_service_1.ExamService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => category_service_1.CategoryService))),
    __param(2, mongoose_2.InjectModel('Questions')),
    __metadata("design:paramtypes", [exam_service_1.ExamService,
        category_service_1.CategoryService, typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map