import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { CommonServiceService } from '../../service/common-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  token:any;
  currentUser:any;
  result:any;
  id:any;
  toggleMinimize(e) {
    this.sidebarMinimized = e;   
  }
  constructor(private user:CommonServiceService,public route:Router,public router:ActivatedRoute) { 
  this.token = localStorage.getItem("token");
  this.currentUser = this.token;
  
  }
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');   
  }
  onLogout(){        
    localStorage.removeItem("token");
    console.log(this.currentUser);  
    this.currentUser = null;   
    console.log(this.currentUser);     
    this.route.navigate(['/login']);
  }

  getProfile() {      
      this.route.navigate(['/profile'])     
  }
}
