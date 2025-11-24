import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryActComponent } from './delivery-act.component';

describe('DeliveryActComponent', () => {
  let component: DeliveryActComponent;
  let fixture: ComponentFixture<DeliveryActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
