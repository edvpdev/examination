import { ScorecardService } from '@core/services/scorecard.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IQuestion } from '../../../../../shared/interfaces/question';
import { Exam } from '../../../../../shared/interfaces/exam';
import { ExamService } from '@core/services/exam.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.scss'],
})
export class ExamViewComponent implements OnInit {
  id: string;
  exam: Exam;
  examQuestions: IQuestion[] = [];
  examTest: FormGroup;
  // @ViewChild('stepper') stepper;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private examService: ExamService,
    private authService: AuthService,
    private scorecardService: ScorecardService,
  ) {
    this.examTest = this.fb.group({
      answers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.router.url.split('exams/') && this.router.url.split('exams/')[1]) {
      this.id = this.router.url.split('exams/')[1];
    }

    if (this.router.url.split('exams/') && this.router.url.split('exams/')[1]) {
      this.id = this.router.url.split('exams/')[1];
      this.getExam(this.id);
    }
  }

  getExam(id: string) {
    this.examService.getExam(id).subscribe(
      (res) => {
        this.exam = res;
        this.examQuestions = this.exam.questions;
        this.initForm(this.examQuestions);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  initForm(questions) {
    const formAnswers = this.examTest.controls.answers as FormArray;
    questions.forEach(() => {
      formAnswers.push(
        this.fb.group({
          answer: new FormControl('', [Validators.required]),
        }),
      );
    });
  }

  // addAnswer() {
  //   this.stepper.next();
  // }

  submit(exam, questions: IQuestion[]) {
    const examID = exam._id;
    const formAnswers = this.examTest.value.answers;
    const newAnswers = questions.map((question, indx) => {
      const answer = {
        title: question?.title || '',
        questionText: question?.questionText || '',
        questionAnswer: formAnswers[indx].answer,
        maxScore: question?.maxScore || 0,
        category: question.category,
        givenScore: question?.maxScore || 0,
      };
      return answer;
    });
    console.log(newAnswers);
    const userName = this.authService.displayName();
    console.log(`POST /api/scorecards?examID=${examID}&user=${userName}`);
    this.scorecardService
      .createScorecard(examID, userName, newAnswers)
      .subscribe((response) => {});
  }

  goBack() {
    this.location.back();
  }

  track(item: any, index: number) {
    return index;
  }
}
