import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../service/common-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  currentTutorial = null;
  reg = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    role: '',
    password: '',
  };
  submitted = false;
  constructor(private user:CommonServiceService,public router: Router) { }

  ngOnInit(): void {}

  submitForm(){    
    console.log("dfgdsf");      
    const data = {
      name:this.reg.name,
      email:this.reg.email,
      mobile:this.reg.mobile,
      address:this.reg.address,
      role:this.reg.role,
      password:this.reg.password
    };
    this.user.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true; 
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);          
        });  
  } 
  }