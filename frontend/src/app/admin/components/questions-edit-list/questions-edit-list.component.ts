import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from '../../../../../shared/interfaces/question';
import { QuestionService } from '@core/services/question.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questions-edit-list',
  templateUrl: './questions-edit-list.component.html',
  styleUrls: ['./questions-edit-list.component.scss'],
})
export class QuestionsEditListComponent implements OnInit {
  questions: IQuestion[];
  pageSize: number = 5;
  pageLength: number = 1;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.showPages(this.pageIndex, this.pageSize);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  setPage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.showPages(pageEvent.pageIndex, this.pageSize);
  }

  showPages(pageIndex, pageSize) {
    pageIndex = pageIndex + 1;
    this.questionService.getAllQuestions(pageIndex, pageSize).subscribe(
      (res) => {
        this.questions = res.res;
        this.pageLength = res.total;
      },
      (err) => console.log('Questions GET Error', err),
    );
  }

  edit(id: string) {
    console.log('edit question');
    this.router.navigateByUrl(`admin/question/${id}`);
  }

  delete(id: string, number: number) {
    if (number === 0) {
      console.log('delete');
    } else {
      this.openSnackBar('Cannot delete question with exams assigned.', 'Undo');
    }
  }

  new() {
    this.router.navigateByUrl('admin/question/create');
  }
}
