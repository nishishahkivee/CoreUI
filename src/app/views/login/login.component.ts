import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../service/common-service.service';
import {  Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 
    reg = {
      email:'',
      password:'',
    };
constructor(private user:CommonServiceService,public route:Router) { }

  ngOnInit(): void {}
  login(){
    const data = {
    email:this.reg.email,
    password:this.reg.password
  };
  this.user.login(data)
  .subscribe(
  response => {
    console.log(response); 
    localStorage.setItem ('token', response['token']);   
    localStorage.setItem ('id' , response['id']);  
    this.route.navigate(['/base/users/']);
  },
  error => {
    console.log(error);      
  });
}
onLogout(){
  this.user.deleteToken()
  this.route.navigate(['/login']);
}
   
}
