import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ScorecardService } from '@core/services/scorecard.service';
import { Scorecard } from '../../../../../shared/interfaces/scorecard';

@Component({
  selector: 'app-scorecards-list',
  templateUrl: './scorecards-list.component.html',
  styleUrls: ['./scorecards-list.component.scss'],
})
export class ScorecardsListComponent implements OnInit {
  scorecards: Scorecard[];
  pageSize: number = 5;
  pageLength: number = 1;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private scorecardService: ScorecardService,
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
    this.scorecardService
      .getAllScorecards(pageIndex, pageSize, 'In progress')
      .subscribe(
        (res) => {
          this.scorecards = res.res;
          this.pageLength = res.total;
        },
        (err) => console.log('Scorecards GET Error', err),
      );
  }

  openScorecard(id: string): void {
    this.router.navigateByUrl(`scorecards/${id}`);
  }
}
