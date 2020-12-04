import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardViewComponent } from './scorecard-view.component';

describe('ScorecardViewComponent', () => {
  let component: ScorecardViewComponent;
  let fixture: ComponentFixture<ScorecardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
