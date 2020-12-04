import {
  Inject,
  Injectable,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../interfaces/category';
import { QuestionsService } from '../questions/questions.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../../filters/validation.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories')
    private categoryModel: Model<Category>,
    @Inject(forwardRef(() => QuestionsService))
    private readonly questionService: QuestionsService,
  ) {}

  async getAllCategories(
    pageNumber: number,
    pageSize: number,
  ): Promise<Category[]> {
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

  async getCategory(categoryID: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: categoryID });
  }

  async createCategory(category: Category): Promise<Category> {
    // check if category with same title doesn't exist
    const count = await this.categoryModel
      .find({ title: category.title })
      .countDocuments();

    if (count > 0) {
      throw new BadRequestException('Category with given title already exists');
    }

    const newCategory = this.categoryModel(category);
    await newCategory.save();
    return newCategory.toObject({ versionKey: false });
  }

  async updateCategory(
    id: string,
    category: Partial<Category>,
  ): Promise<Category> {
    const { title } = category;

    const oldCategory = await this.categoryModel.findById({
      _id: id,
    });
    if (!oldCategory) {
      throw new BadRequestException('Category with such an ID does not exist');
    }

    // check if another category with such title already exists
    const categoryWithGivenTitle = await this.categoryModel.findOne({
      title: title,
      _id: { $ne: id },
    });
    if (categoryWithGivenTitle) {
      throw new BadRequestException('Category with such title already exists');
    }

    oldCategory.title = title || oldCategory.title;
    await oldCategory.save();
    return oldCategory;
  }

  async deleteCategory(categoryID: string): Promise<Category> {
    const questionsWithGivenCategory = await this.questionService.getQuestionsByCategoryID(
      categoryID,
    );
    if (questionsWithGivenCategory.length) {
      throw new BadRequestException(
        'Cant delete category which has questins assigned.',
      );
    } else {
      return this.categoryModel.findOneAndDelete({ _id: categoryID });
    }
  }

  async findOne(filters: any): Promise<Category> {
    return this.categoryModel.findOne(filters);
  }

  async validateReceivedCategory(
    category: Partial<Category>,
  ): Promise<Category> {
    console.log(category);
    const object = plainToClass(Category, category);
    console.log(object);
    const errors = await validate(object, { skipMissingProperties: true });
    if (errors.length) {
      const messages = errors.map(
        (error) => `Category ${error.property} has wrong value ${error.value},
        ${Object.values(error.constraints).join(', ')} `,
      );

      throw new ValidationException(messages);
    }

    if (Object.keys(category).length) {
      // categoryService.findOne({title: category})
      const foundCategory = await this.categoryModel.findOne({
        title: category.title,
      });

      if (foundCategory) {
        // Assign existing category entry
        return foundCategory;
      } else {
        throw new BadRequestException('Provided Category does not exist');
      }
    } else {
      throw new BadRequestException('Question must have category assigned.');
    }
  }
}
