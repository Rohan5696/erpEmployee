import { Component, Input, OnInit } from '@angular/core';
import { IndexedDbService } from '../indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit{
  @Input() employees:any;
  swiped:any = false;
  touchStartX:number=0;
  todayDate=new Date();
  currEmployees: any=[];
  preEmployees: any=[];
  constructor(private indexedDbService: IndexedDbService, private router:Router){}
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.swiped= false;
  }

  onTouchMove(event: TouchEvent) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.touchStartX;

    if (deltaX > 50) {
      this.swiped = true;
    }
  }

  ngOnInit(){
      //this.retrieveItems(employees);
      console.log("empdetao99999999", this.employees)
  }

    retrieveItems(employees:any) {
      this.employees = employees.map((item:any) => ({
        ...item,
        swiped: false,
        touchStartX: 0
      }));
      this.currEmployees= this.employees.filter((ele:any)=>{
        const date1 = new Date(ele.endDate);
        if(date1>this.todayDate){
          return ele;
        }
      });
      this.preEmployees= this.employees.filter((ele:any)=>{
        const date1 = new Date(ele.endDate);
        if(date1<this.todayDate){
          return ele;
        }
      });
      console.log("preEmployees",this.preEmployees);
    
  }

  deleteItem(empid:any,index:any) {
    this.deleteempItem(empid)
  }

  routeEdit(emp:any){
    this.router.navigateByUrl('/empform',{ state: emp })
  }

  async deleteempItem(id: number) {
    try {
      this.preEmployees= this.preEmployees.filter((item:any) => item.id !== id);
      this.currEmployees= this.currEmployees.filter((item:any) => item.id !== id);
      await this.indexedDbService.deleteItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
}
}
