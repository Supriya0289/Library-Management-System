import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanListComponent } from './user-loan-list.component';

describe('UserLoanListComponent', () => {
  let component: UserLoanListComponent;
  let fixture: ComponentFixture<UserLoanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
