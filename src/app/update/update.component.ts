import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id:any;
  update = {
    name: '',
    email: '',
    mobile: '',    
  };
  submitted = false;
  constructor(private service:CommonServiceService,public route:Router,public router:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id');
  }

  updateUser(){    
    console.log("dfgdsf");      
    const data = {
      name:this.update.name,
      email:this.update.email,
      mobile:this.update.mobile,      
          
    };
    console.log(data);
    
    this.service.update(this.router.snapshot.paramMap.get('id'),data)
      .subscribe(
        response => {
          console.log(response);         
          this.submitted = true; 
          this.route.navigate(['/profile']);
        },
        error => {
          console.log(error);          
        });  
  }
}
