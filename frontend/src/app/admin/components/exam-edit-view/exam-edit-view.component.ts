import { QuestionService } from './../../../core/services/question.service';
import { IQuestion } from './../../../../../shared/interfaces/question';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Exam } from '../../../../../shared/interfaces/exam';
import { ExamService } from '@core/services/exam.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam-edit-view',
  templateUrl: './exam-edit-view.component.html',
  styleUrls: ['./exam-edit-view.component.scss'],
})
export class ExamEditViewComponent implements OnInit {
  id: string;
  exam: Exam;
  examQuestions: IQuestion[] = [];
  sortedQuestions = {};
  examEdit: FormGroup;
  objectKeys = Object.keys;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private examService: ExamService,
    private questionService: QuestionService,
  ) {
    this.examEdit = this.fb.group({
      title: new FormControl(''),
      formCategories: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    if (
      this.router.url.split('exam/') &&
      this.router.url.split('exam/')[1] === 'create'
    ) {
      this.getAndSetAllQuestions(false);
    } else {
      this.id = this.router.url.split('exam/')[1];
      this.getExam(this.id);
      this.getAndSetAllQuestions(true);
    }
  }

  getExam(id: string) {
    this.examService.getExam(id).subscribe(
      (res) => {
        this.exam = res;
        this.examQuestions = this.exam.questions;
        console.log(this.exam);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  getAndSetAllQuestions(values) {
    this.questionService.getAllQuestions(1, 0).subscribe(
      (res) => {
        this.sortedQuestions = this.sortQuestionsPerCategory(res.res);
        this.initFormForQuestions(this.sortedQuestions, values);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  initFormForQuestions(sortedQuestionsPerCategory, values) {
    const formCategories = this.examEdit.controls.formCategories as FormGroup;
    const categoryValues: Array<any> = Object.values(
      sortedQuestionsPerCategory,
    );
    const categoryKeys: Array<any> = Object.keys(sortedQuestionsPerCategory);

    categoryKeys.forEach((key, index) => {
      //console.log('Creating group of array Questions for category: ', key);
      const singleCategoryQuestions = categoryValues[index];
      //console.log('Creating an array of category Questions');
      const categoriesQuestions = values
        ? singleCategoryQuestions
            .filter((question) => {
              const examQuestionsIDs = this.exam?.questions.map(
                (examQuestion: any) => examQuestion._id,
              );
              return examQuestionsIDs.indexOf(question._id) > -1;
            })
            .map((filteredQuestion) => filteredQuestion.title)
        : [];

      formCategories.addControl(
        key,
        categoriesQuestions
          ? new FormControl([...categoriesQuestions])
          : new FormControl([]),
      );
    });
  }

  sortQuestionsPerCategory(questions: IQuestion[]) {
    let sortedQuestions = {};
    questions.forEach((question) => {
      sortedQuestions[question.category.title] = sortedQuestions[
        question.category.title
      ]
        ? sortedQuestions[question.category.title]
        : [];
      sortedQuestions[question.category.title].push(question);
    });
    return sortedQuestions;
  }

  goBack() {
    this.location.back();
  }

  save() {
    console.log(this.examEdit.value);
    let body = {};
    let questions: any = Object.values(
      this.examEdit.value.formCategories,
    ).reduce((a: Array<any>, b: Array<any>) => {
      return a.concat(...b);
    }, []);
    body = {
      title: this.examEdit.value.title,
      questions: questions.map((value) => {
        return {
          title: value,
        };
      }),
    };
    console.log(body);
    if (this.exam) {
      this.examService.updateExam(this.id, body).subscribe((response) => {});
    } else {
      this.examService.createExam(body).subscribe((response) => {});
    }
  }
}
