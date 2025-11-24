import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUnitComponent } from './step-unit.component';

describe('StepUnitComponent', () => {
  let component: StepUnitComponent;
  let fixture: ComponentFixture<StepUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
