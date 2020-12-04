import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEditViewComponent } from './exam-edit-view.component';

describe('ExamEditViewComponent', () => {
  let component: ExamEditViewComponent;
  let fixture: ComponentFixture<ExamEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
