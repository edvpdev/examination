import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsListComponent } from './scorecards-list.component';

describe('ScorecardsListComponent', () => {
  let component: ScorecardsListComponent;
  let fixture: ComponentFixture<ScorecardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
