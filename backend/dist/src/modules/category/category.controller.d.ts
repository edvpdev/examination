import { CategoryService } from './category.service';
import { Category } from '../../interfaces/category';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(pageNumber?: number, pageSize?: number): Promise<any>;
    getExam(id: string): Promise<Category>;
    createCategory(category: Category): Promise<Category>;
    updateCategory(categoryID: string, category: Category): Promise<Category>;
    deleteCategory(categoryID: string): Promise<Category>;
}
