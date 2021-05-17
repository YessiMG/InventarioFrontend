import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductDialogComponent } from './list-product-dialog.component';

describe('ListProductDialogComponent', () => {
  let component: ListProductDialogComponent;
  let fixture: ComponentFixture<ListProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
