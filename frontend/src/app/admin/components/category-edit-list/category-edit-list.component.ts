import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../../shared/interfaces/category';
import { CategoryService } from '@core/services/category.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-edit-list',
  templateUrl: './category-edit-list.component.html',
  styleUrls: ['./category-edit-list.component.scss'],
})
export class CategoryEditListComponent implements OnInit {
  categories: Category[];
  pageSize: number = 5;
  pageLength: number = 1;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.showPages(this.pageIndex, this.pageSize);
  }

  setPage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.showPages(pageEvent.pageIndex, this.pageSize);
  }

  showPages(pageIndex, pageSize) {
    pageIndex = pageIndex + 1;
    this.categoryService.getAllCategories(pageIndex, pageSize).subscribe(
      (res) => {
        this.categories = res.res;
        this.pageLength = res.total;
      },
      (err) => console.log('Exams GET Error', err),
    );
  }

  edit(id: string) {
    this.router.navigateByUrl(`admin/category/${id}`);
  }

  delete(id: string) {}

  new() {
    this.router.navigateByUrl('admin/category/create');
  }
}
