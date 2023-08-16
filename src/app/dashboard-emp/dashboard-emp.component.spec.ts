import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpComponent } from './dashboard-emp.component';

describe('DashboardEmpComponent', () => {
  let component: DashboardEmpComponent;
  let fixture: ComponentFixture<DashboardEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEmpComponent]
    });
    fixture = TestBed.createComponent(DashboardEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
