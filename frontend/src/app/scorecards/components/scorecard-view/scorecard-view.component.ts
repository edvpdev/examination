import { CategoryService } from '@core/services/category.service';
import { ScorecardService } from '@core/services/scorecard.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Scorecard } from '../../../../../shared/interfaces/scorecard';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-scorecard-view',
  templateUrl: './scorecard-view.component.html',
  styleUrls: ['./scorecard-view.component.scss'],
})
export class ScorecardViewComponent implements OnInit {
  id: string;
  scorecard: Scorecard;
  sortedAnswers = {};
  objectKeys = Object.keys;
  scorecardReview: FormGroup;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private scorecardService: ScorecardService,
    private categoryService: CategoryService,
  ) {
    this.scorecardReview = this.fb.group({
      formCategories: this.fb.array([]),
      notes: new FormControl(''),
      bonusScore: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (
      this.router.url.split('scorecards/') &&
      this.router.url.split('scorecards/')[1]
    ) {
      this.id = this.router.url.split('scorecards/')[1];
      this.getScorecard(this.id);
    }
  }

  getScorecard(id: string) {
    this.scorecardService.getScorecard(id).subscribe(
      (res) => {
        this.scorecard = res;
        this.getAndSetAllCategories();
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  getAndSetAllCategories() {
    this.categoryService.getAllCategories(1, 0).subscribe(
      (res) => {
        this.sortedAnswers = this.sortAnswersPerCategory(res.res);
        this.initFormForAnswers(this.sortedAnswers);
      },
      (err) => console.log('Question GET Error', err),
    );
  }

  initFormForAnswers(sortedAnswersPerCategory) {
    const formCategories = this.scorecardReview.controls
      .formCategories as FormArray;
    const categoryValues: Array<any> = Object.values(sortedAnswersPerCategory);
    const categoryKeys: Array<any> = Object.keys(sortedAnswersPerCategory);

    categoryKeys.forEach((key, index) => {
      //console.log('Creating group of array answers for category: ', key);

      //console.log('Creating an array of category answers');
      const categoriesAnswers = this.fb.array([]);
      categoryValues[index].forEach((answer) => {
        categoriesAnswers.push(
          this.fb.group({
            [answer.title]: new FormControl(answer.maxScore),
          }),
        );
      });

      //console.log('Creating a group for array of category answers');
      formCategories.push(
        this.fb.group({
          [key]: categoriesAnswers,
        }),
      );
    });

    this.scorecardReview.setValue({
      bonusScore: this.scorecard.bonusScore || 0,
      notes: this.scorecard.notes || '',
      formCategories: formCategories,
    });
  }

  sortAnswersPerCategory(categories) {
    let sortedAnswers = {};
    this.scorecard.answers.forEach((answer) => {
      const categoryTitle = categories.filter(
        (category) => category._id === answer.category,
      )[0].title;
      sortedAnswers[categoryTitle] = sortedAnswers[categoryTitle]
        ? sortedAnswers[categoryTitle]
        : [];
      sortedAnswers[categoryTitle].push(answer);
    });
    return sortedAnswers;
  }

  goBack() {
    this.location.back();
  }

  reviewScorecard() {
    console.log('Review action');
    const formAnswers = this.scorecardReview.value.formCategories;
    const formBonusScore = this.scorecardReview.value.bonusScore;
    const formNotes = this.scorecardReview.value.notes;

    const updatedAnswers = this.validateAndParseScores(formAnswers);
    const scorecard = {
      answers: updatedAnswers,
      bonusScore: formBonusScore,
      notes: formNotes,
    };
    console.log(scorecard);
    this.scorecardService
      .updateScorecard(this.id, scorecard, 'review')
      .subscribe((response) => {});
  }

  saveScorecard() {
    console.log('Save action');

    const formAnswers = this.scorecardReview.value.formCategories;
    const formBonusScore = this.scorecardReview.value.bonusScore;
    const formNotes = this.scorecardReview.value.notes;

    const updatedAnswers = this.validateAndParseScores(formAnswers);
    const scorecard = {
      answers: updatedAnswers,
      bonusScore: formBonusScore,
      notes: formNotes,
      title: this.scorecard.title,
      user: this.scorecard.user,
    };
    this.scorecardService
      .updateScorecard(this.id, scorecard, 'save')
      .subscribe((response) => {});
  }

  validateAndParseScores(formAnswers) {
    const oneArr = formAnswers.reduce((a, category) => {
      return a.concat(...Object.values(category));
    }, []);
    const updatedAnswers = [];
    oneArr.forEach((res) => {
      const questionTitleFromScorecard = Object.keys(res)[0];
      const questionGivenScoreFromScorecard: any = Object.values(res)[0];
      const oldAnswer = this.scorecard.answers.filter(
        (answer) => answer.title === questionTitleFromScorecard,
      )[0];
      if (isNaN(questionGivenScoreFromScorecard)) {
        updatedAnswers.push({
          ...oldAnswer,
        });
      } else {
        updatedAnswers.push({
          ...oldAnswer,
          givenScore: questionGivenScoreFromScorecard,
        });
      }
    });
    return updatedAnswers;
  }

  showAlert(message: string) {}

  track(item: any, index: number) {
    return index;
  }

  track1(item: any, index: number) {
    return index;
  }
}
