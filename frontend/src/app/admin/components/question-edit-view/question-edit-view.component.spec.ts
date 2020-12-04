import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditViewComponent } from './question-edit-view.component';

describe('QuestionEditViewComponent', () => {
  let component: QuestionEditViewComponent;
  let fixture: ComponentFixture<QuestionEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
