import { Component, OnInit } from '@angular/core';
import {CommonServiceService } from '../../service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  templateUrl: 'tables.component.html'
})

export class TablesComponent implements OnInit {
  list:any;
  item = [];
  result: any;
  limit:2
	error: any;
	total = { totalDocs: 0, totalPages: 0, hasPrevPage: 0, page: 1, hasNextPage: 0, prevPage: 0, nextPage: 0 }
	page = 1;
  size: 2;
  message:any;
  name:any;
  constructor(private route: ActivatedRoute,private router:Router,private tables:CommonServiceService) { }
  totalItems: number = 11;
  currentPage: number= 1;
  columns = ["id","name","email","mobile","role"];
  index = ["_id","name","email","mobile","role"];   
  ngOnInit(): void {
    this.getRecord(this.page);   
    this.message ='';
    
  }
  getUser(id): void {
    this.tables.get(id)
      .subscribe(
        data => {
          this.list = data;             
        },
        error => {
          console.log(error);
          
        }
      )
  }
  getAll(){    
    this.tables.getAll(this.size,this.page)
    .subscribe(
      data => {
        this.list = data;
        console.log(data);        
      },
      error => {
        console.log(error);        
      });
  }

  search(){  
    console.log("seert");  
    console.log(this.name);       
    this.tables.search(this.name)
      .subscribe(
        data => {
          this.list = data;
          console.log(data);          
        },
        error => {
          console.log(error);
          
        }
      )
  }  
  
  getRecord(page,isKeyEvent:boolean=false){     
    console.log(this.limit);    
    if(isKeyEvent)
      return;
      this.page = page;          
      this.tables.getRecord(this.limit,this.page) 
      .subscribe(
          data => {
            this.list = data;                    
          },      
          error => {
            console.log(error);            
          }        
          
      )
  }

  delete(id) {
    this.tables.Delete(id)
      .subscribe(response => {
        console.log(response);  
        localStorage.removeItem('id');        
        this.router.navigate(['/base/users']);      
      },
      error => {
        console.log(error);        
      });   
  }
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
 
}
