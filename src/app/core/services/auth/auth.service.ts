import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;

  constructor( private readonly httpClient:HttpClient , private router:Router) { }

  sendRegisterData(data:object):Observable<any>{
return this.httpClient.post(`${environments.baseUrl}/api/v1/users/signUp`, data)
  }
  sendLoginData(data:object):Observable<any>{
    return this.httpClient.post(`${environments.baseUrl}/api/v1/users/signIn` , data)
      }

    saveUserToken():void{
      const token = localStorage.getItem('userToken')!
      this.userData =jwtDecode(token)
      console.log(this.userData);
      
    }
    userSignOut():void{
localStorage.removeItem('userToken')
this.userData =null
this.router.navigate(['/login'])
    }
}
