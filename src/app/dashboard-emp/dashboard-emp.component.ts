import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';
@Component({
  selector: 'app-dashboard-emp',
  templateUrl: './dashboard-emp.component.html',
  styleUrls: ['./dashboard-emp.component.css']
})
export class DashboardEmpComponent implements OnInit{
  constructor( private router:Router,private indexedDbService: IndexedDbService) {}

  employeesData: any=[];

  ngOnInit(){
    this.retrieveItems();
} 

async retrieveItems() {
  try {
    this.employeesData = await this.indexedDbService.getAllItems();
  } catch (error) {
    console.error("Error retrieving items:", error);
  }
}


  routeTo(){
    this.router.navigate(['empform']);
  }
}
