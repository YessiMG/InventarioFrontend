import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiViewComponent } from './power-bi-view.component';

describe('PowerBiViewComponent', () => {
  let component: PowerBiViewComponent;
  let fixture: ComponentFixture<PowerBiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
