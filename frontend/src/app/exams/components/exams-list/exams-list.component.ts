import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../../../shared/interfaces/exam';
import { Router } from '@angular/router';
import { ExamService } from '@core/services/exam.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss'],
})
export class ExamsListComponent implements OnInit {
  exams: Exam[];
  pageSize: number = 5;
  pageLength: number = 1;
  pageIndex: number = 0;

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit(): void {
    this.showPages(this.pageIndex, this.pageSize);
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

  startExam(id: string) {
    console.log('Exam started');
    this.router.navigateByUrl(`exams/${id}`);
  }
}
