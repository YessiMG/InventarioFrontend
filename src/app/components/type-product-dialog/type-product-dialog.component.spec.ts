import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProductDialogComponent } from './type-product-dialog.component';

describe('TypeProductDialogComponent', () => {
  let component: TypeProductDialogComponent;
  let fixture: ComponentFixture<TypeProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
