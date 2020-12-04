import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from '../../../../../shared/interfaces/category';
import { CategoryService } from '@core/services/category.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-edit-view',
  templateUrl: './category-edit-view.component.html',
  styleUrls: ['./category-edit-view.component.scss'],
})
export class CategoryEditViewComponent implements OnInit {
  id: string;
  category: Category;
  categoryEdit: FormGroup;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private categoryService: CategoryService,
  ) {
    this.categoryEdit = this.fb.group({
      title: new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log(this.router.url);
    if (
      this.router.url.split('category/') &&
      this.router.url.split('category/')[1] === 'create'
    ) {
      this.initForm(false);
    } else {
      this.id = this.router.url.split('category/')[1];
      this.getCategory(this.id);
    }
  }

  initForm(values) {
    this.categoryEdit.setValue({
      title: values ? this.category.title : '',
    });
  }

  getCategory(id: string) {
    this.categoryService.getCategory(id).subscribe(
      (res) => {
        this.category = res;
        this.initForm(true);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  save() {
    console.log(this.categoryEdit.value);
    let body = {};
    body = {
      title: this.categoryEdit.value.title,
    };
    if (this.category) {
      this.categoryService
        .updateCategory(this.id, body)
        .subscribe((response) => {});
    } else {
      this.categoryService.createCategory(body).subscribe((response) => {});
    }
  }

  goBack() {
    this.location.back();
  }
}
