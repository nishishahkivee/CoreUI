import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  token:any;
  header;
  constructor(private http:HttpClient) {
  this.token = localStorage.getItem('token');
  this.header = new HttpHeaders().set(
    "Authorization",
     localStorage.getItem("token")
  );
  }
  create(obj) {
    return this.http.post(environment.api_url + '/register' , obj);
  }
  update(id,data) {
    return this.http.put(`${environment.api_url}/${id}`, data);
  }
  login(obj) {
    return this.http.post(environment.api_url + '/login',obj);
  }
  getAll(size,pageNo) {
    return this.http.post(environment.api_url+'/userData',{headers:this.header});
  }
  
  profile() {    
    return this.http.post(environment.api_url + '/profile',null,{headers:this.header})
  }

  Delete(id) { 
    return this.http.delete(`${environment.api_url}/${id}`);
  }

  get(id) {
    return this.http.get(`${environment.api_url}/${id}`);
  }

  deleteToken() {
    localStorage.removeItem('token');
 } 

 search(name) {
   return this.http.get(environment.api_url +`/search?name=${name}`);
 } 

 getRecord(limit,page) {
  return this.http.post(environment.api_url +`/limit?limit=${limit},page=${page}`,null);
}
}
