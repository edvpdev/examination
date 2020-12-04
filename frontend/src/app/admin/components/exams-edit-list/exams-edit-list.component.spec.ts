import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsEditListComponent } from './exams-edit-list.component';

describe('ExamsEditListComponent', () => {
  let component: ExamsEditListComponent;
  let fixture: ComponentFixture<ExamsEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsEditListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
