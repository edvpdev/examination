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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const category_1 = require("../../interfaces/category");
const questions_service_1 = require("../questions/questions.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validation_exception_1 = require("../../filters/validation.exception");
let CategoryService = class CategoryService {
    constructor(categoryModel, questionService) {
        this.categoryModel = categoryModel;
        this.questionService = questionService;
    }
    async getAllCategories(pageNumber, pageSize) {
        return this.categoryModel
            .find({})
            .sort({ title: 'asc' })
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
            .select(['_id', 'title']);
    }
    async getCount() {
        return this.categoryModel.find().countDocuments();
    }
    async getCategory(categoryID) {
        return this.categoryModel.findOne({ _id: categoryID });
    }
    async createCategory(category) {
        const count = await this.categoryModel
            .find({ title: category.title })
            .countDocuments();
        if (count > 0) {
            throw new common_1.BadRequestException('Category with given title already exists');
        }
        const newCategory = this.categoryModel(category);
        await newCategory.save();
        return newCategory.toObject({ versionKey: false });
    }
    async updateCategory(id, category) {
        const { title } = category;
        const oldCategory = await this.categoryModel.findById({
            _id: id,
        });
        if (!oldCategory) {
            throw new common_1.BadRequestException('Category with such an ID does not exist');
        }
        const categoryWithGivenTitle = await this.categoryModel.findOne({
            title: title,
            _id: { $ne: id },
        });
        if (categoryWithGivenTitle) {
            throw new common_1.BadRequestException('Category with such title already exists');
        }
        oldCategory.title = title || oldCategory.title;
        await oldCategory.save();
        return oldCategory;
    }
    async deleteCategory(categoryID) {
        const questionsWithGivenCategory = await this.questionService.getQuestionsByCategoryID(categoryID);
        if (questionsWithGivenCategory.length) {
            throw new common_1.BadRequestException('Cant delete category which has questins assigned.');
        }
        else {
            return this.categoryModel.findOneAndDelete({ _id: categoryID });
        }
    }
    async findOne(filters) {
        return this.categoryModel.findOne(filters);
    }
    async validateReceivedCategory(category) {
        console.log(category);
        const object = class_transformer_1.plainToClass(category_1.Category, category);
        console.log(object);
        const errors = await class_validator_1.validate(object, { skipMissingProperties: true });
        if (errors.length) {
            const messages = errors.map((error) => `Category ${error.property} has wrong value ${error.value},
        ${Object.values(error.constraints).join(', ')} `);
            throw new validation_exception_1.ValidationException(messages);
        }
        if (Object.keys(category).length) {
            const foundCategory = await this.categoryModel.findOne({
                title: category.title,
            });
            if (foundCategory) {
                return foundCategory;
            }
            else {
                throw new common_1.BadRequestException('Provided Category does not exist');
            }
        }
        else {
            throw new common_1.BadRequestException('Question must have category assigned.');
        }
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Categories')),
    __param(1, common_1.Inject(common_1.forwardRef(() => questions_service_1.QuestionsService))),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, questions_service_1.QuestionsService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map