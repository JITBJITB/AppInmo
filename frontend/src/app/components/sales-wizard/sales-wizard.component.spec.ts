import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesWizardComponent } from './sales-wizard.component';

describe('SalesWizardComponent', () => {
  let component: SalesWizardComponent;
  let fixture: ComponentFixture<SalesWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
