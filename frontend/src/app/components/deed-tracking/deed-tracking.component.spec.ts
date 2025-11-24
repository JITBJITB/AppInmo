import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedTrackingComponent } from './deed-tracking.component';

describe('DeedTrackingComponent', () => {
  let component: DeedTrackingComponent;
  let fixture: ComponentFixture<DeedTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeedTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeedTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
