import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../../../../../shared/interfaces/exam';
import { ExamService } from '@core/services/exam.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exams-edit-list',
  templateUrl: './exams-edit-list.component.html',
  styleUrls: ['./exams-edit-list.component.scss'],
})
export class ExamsEditListComponent implements OnInit {
  exams: Exam[];
  pageSize: number = 5;
  pageLength: number = 1;
  pageIndex: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private examService: ExamService,
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
    this.examService.getAllExams(pageIndex, pageSize).subscribe(
      (res) => {
        this.exams = res.res;
        this.pageLength = res.total;
      },
      (err) => console.log('Exams GET Error', err),
    );
  }

  edit(id: string) {
    console.log('edit exam');
    this.router.navigateByUrl(`admin/exam/${id}`);
  }

  delete(id: string, number: number) {
    if (number === 0) {
      console.log('delete');
    } else {
      this.openSnackBar('Cannot delete exam with questions assigned.', 'Undo');
    }
  }

  new() {
    this.router.navigateByUrl('admin/exam/create');
  }
}
