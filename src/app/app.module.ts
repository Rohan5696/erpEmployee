import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { DashboardEmpComponent } from './dashboard-emp/dashboard-emp.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SwipeToDeleteDirective } from './swipe-to-delete.directive';
@NgModule({
  declarations: [
    AppComponent,
    DashboardEmpComponent,
    EmpDetailsComponent,
    EmpFormComponent,
    SwipeToDeleteDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
