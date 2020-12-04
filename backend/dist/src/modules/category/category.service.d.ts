import { Model } from 'mongoose';
import { Category } from '../../interfaces/category';
import { QuestionsService } from '../questions/questions.service';
export declare class CategoryService {
    private categoryModel;
    private readonly questionService;
    constructor(categoryModel: Model<Category>, questionService: QuestionsService);
    getAllCategories(pageNumber: number, pageSize: number): Promise<Category[]>;
    getCount(): Promise<any>;
    getCategory(categoryID: string): Promise<Category>;
    createCategory(category: Category): Promise<Category>;
    updateCategory(id: string, category: Partial<Category>): Promise<Category>;
    deleteCategory(categoryID: string): Promise<Category>;
    findOne(filters: any): Promise<Category>;
    validateReceivedCategory(category: Partial<Category>): Promise<Category>;
}
