import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditListComponent } from './category-edit-list.component';

describe('CategoryEditListComponent', () => {
  let component: CategoryEditListComponent;
  let fixture: ComponentFixture<CategoryEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryEditListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
