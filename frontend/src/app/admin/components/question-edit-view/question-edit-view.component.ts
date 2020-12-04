import { IQuestion } from './../../../../../shared/interfaces/question';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { QuestionService } from '@core/services/question.service';
import { Category } from '../../../../../shared/interfaces/category';
import { ExamService } from '@core/services/exam.service';
import { Exam } from '../../../../../shared/interfaces/exam';
import { CategoryService } from '@core/services/category.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list/selection-list';

@Component({
  selector: 'app-question-edit-view',
  templateUrl: './question-edit-view.component.html',
  styleUrls: ['./question-edit-view.component.scss'],
})
export class QuestionEditViewComponent implements OnInit {
  id: string;
  question: IQuestion;
  questionExams: Exam[] = [];
  categories: Category[] = [];
  exams: Exam[] = [];
  questionEdit: FormGroup;
  selectedOptions: SelectionModel<MatListOption>;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private questionService: QuestionService,
    private examService: ExamService,
    private categoryService: CategoryService,
  ) {
    this.questionEdit = this.fb.group({
      title: new FormControl(''),
      selectedCategory: new FormControl([]),
      selectedExams: new FormControl([]),
      maxScore: new FormControl(1),
      questionText: new FormControl(''),
    });

    this.questionEdit.get('selectedCategory').valueChanges.subscribe((item) => {
      const oldValue = this.questionEdit.value.selectedCategory;
      if (item.length === 2) {
        this.questionEdit
          .get('selectedCategory')
          .setValue(item.filter((newCategory) => newCategory !== oldValue[0]));
      }
    });
  }

  ngOnInit(): void {
    this.getAndSetAllCategories();
    this.getAndSetAllExams();

    if (
      this.router.url.split('question/') &&
      this.router.url.split('question/')[1] === 'create'
    ) {
      this.initForm(false);
    } else {
      this.id = this.router.url.split('question/')[1];
      this.getQuestion(this.id);
    }
  }

  initForm(values) {
    this.questionEdit.setValue({
      title: values ? this.question?.title : '',
      selectedCategory: values ? [this.question?.category?.title] : [],
      selectedExams: values
        ? this.question?.exams?.map((exam) => exam.title)
        : [],
      maxScore: values ? this.question?.maxScore : 1,
      questionText: values ? this.question?.questionText : '',
    });
  }

  getQuestion(id: string) {
    this.questionService.getQuestion(id).subscribe(
      (res) => {
        this.question = res;
        this.questionExams = this.question.exams;
        this.initForm(true);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  getAndSetAllCategories() {
    this.categoryService.getAllCategories(1, 0).subscribe(
      (res) => {
        this.categories = res.res;
      },
      (err) => console.log('Categories GET Error', err),
    );
  }

  getAndSetAllExams() {
    this.examService.getAllExams(1, 0).subscribe(
      (res) => {
        this.exams = res.res;
      },
      (err) => console.log('Exams GET Error', err),
    );
  }

  goBack() {
    this.location.back();
  }

  save() {
    let body = {};
    const selectedCategory = this.questionEdit.value.selectedCategory;
    const selectedExams = this.questionEdit.value.selectedExams;
    body = {
      title: this.questionEdit.value.title,
      maxScore: this.questionEdit.value.maxScore,
      questionText: this.questionEdit.value.questionText,
      category: {
        title: selectedCategory[0],
      },
      exams: selectedExams.map((title) => {
        return {
          title: title,
        };
      }),
    };
    if (this.question) {
      console.log(this.questionEdit.value);
      this.questionService
        .updateQuestion(this.id, body)
        .subscribe((response) => {});
    } else {
      this.questionService.createQuestion(body).subscribe((response) => {});
    }
    console.log(body);
  }
}
