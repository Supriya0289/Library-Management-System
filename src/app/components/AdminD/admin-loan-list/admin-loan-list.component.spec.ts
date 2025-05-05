import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanListComponent } from './admin-loan-list.component';

describe('AdminLoanListComponent', () => {
  let component: AdminLoanListComponent;
  let fixture: ComponentFixture<AdminLoanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
