import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { DashboardEmpComponent } from './dashboard-emp/dashboard-emp.component';
const routes: Routes = [
  { path: '', component: DashboardEmpComponent },
  { path: 'empform', component:  EmpFormComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
