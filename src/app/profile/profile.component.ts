import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { navItems } from 'd:/nishi/kiveesoftechproject/Angular/CoreUI/src/app/_nav';
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
  update() {
    this.router.navigate(['/update/' + localStorage.getItem('id')]);
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
}
