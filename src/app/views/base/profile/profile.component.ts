import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id;
  token:any;
  result:{};
  error:any;
  data:any;
  update = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    role: ''      
  };
  constructor(private service:CommonServiceService, public route:ActivatedRoute,private http:HttpClient,public router:Router) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);   
  }

  ngOnInit(): void {
  
    this.getRecord();
  }
  getRecord() {   
    this.service.profile()
    .subscribe(data => {
      this.result = data;      
      console.log(this.result);      
    }); 
  }
  updateUser(){    
    console.log("dfgdsf");      
    const data = {
      name:this.update.name,
      email:this.update.email,
      mobile:this.update.mobile,
      address:this.update.address,
      role:this.update.role    
          
    };
    console.log(data);
    
    this.service.update(this.route.snapshot.paramMap.get('id'),data)
      .subscribe(
        response => {
          console.log(response);         
          
        },
        error => {
          console.log(error);          
        });

  }
  delete() {
    this.service.Delete(localStorage.getItem('id'))
      .subscribe(response => {
        console.log(response);  
        localStorage.removeItem('id');        
        this.router.navigate(['/login']);      
      },
      error => {
        console.log(error);        
      });   
  }
  isCollapsed: boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
}
