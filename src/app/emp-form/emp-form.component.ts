import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexedDbService } from '../indexed-db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent implements OnInit{
  empFormGroup:FormGroup | any;
  count: any=0;
  employees: any=[];
  submitted = false;
  dateValid:boolean=false;
  editMode:boolean=false
  editData: any=[];
  savedBtn:boolean=false;
  constructor(private formBuilder: FormBuilder,private indexedDbService:IndexedDbService, private router:Router,private location: Location){
    this.editData=this.location.getState();
    }

  ngOnInit(){
    if(this.editData.id){
        this.editMode=true;
    }
  //   this.activatedroute.data.subscribe((data:any) => {
  //     this.editData=data;
  //     
  // })
    this.empFormGroup = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required],
      position: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required]
    });
    

  if(this.editMode){
      this.empFormGroup.patchValue({
        name: this.editData.name,
        position: this.editData.position,
        startDate: this.editData.startDate,
        endDate: this.editData.endDate
      });
    }
  }

  UpdateData(){
    this.submitted = true;
    if (this.empFormGroup.invalid) {
      return;
    }
    let startDate= new Date(this.empFormGroup.value.startDate);
    let endDate =new Date(this.empFormGroup.value.endDate)
    if(startDate > endDate){
      this.dateValid=true;
      return;
    }
    else{
      this.dateValid=false;
    }
    this.updateItemDescription(this.empFormGroup.value.id,this.empFormGroup.value);
    }


  async onFormSubmit() {
    this.submitted = true;
    if (this.empFormGroup.invalid) {
      return;
    }
    let startDate= new Date(this.empFormGroup.value.startDate);
    let endDate =new Date(this.empFormGroup.value.endDate)
    if(startDate > endDate){
      this.dateValid=true;
      return;
    }
    else{
      this.dateValid=false;
    }

      await this.retrieveItems();
      if(this.employees.length==0){
        this.count=0;
      }
      else{
        this.count=this.employees[this.employees.length-1].id+1
      }
      this.empFormGroup.get('id').setValue(this.count);
      console.log('Employee saved:', this.empFormGroup.value);
      await this.indexedDbService.addItem(this.empFormGroup.value);
      this.savedBtn=true;
    }
  
    get f(): { [key: string]: AbstractControl } {
      return this.empFormGroup.controls;
    }


  async retrieveItems() {
    try {
      this.employees = await this.indexedDbService.getAllItems();
    }
    catch (error) {
      console.error("Error retrieving items:", error);
    }
  }

  closeForm() {
    this.resetForm();
  }

  resetForm() {
    this.empFormGroup.resetForm();
  }

  async updateItemDescription(id:any,item: any) {
    try {
      await this.indexedDbService.updateItemById(id,item);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  deleteItem() {
    this.deleteempItem(this.empFormGroup.value.id)
  }

  async deleteempItem(id: number) {
    try {
      await this.indexedDbService.deleteItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
}
}
