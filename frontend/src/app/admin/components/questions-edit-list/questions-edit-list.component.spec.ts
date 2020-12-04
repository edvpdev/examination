import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsEditListComponent } from './questions-edit-list.component';

describe('QuestionsEditListComponent', () => {
  let component: QuestionsEditListComponent;
  let fixture: ComponentFixture<QuestionsEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsEditListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
