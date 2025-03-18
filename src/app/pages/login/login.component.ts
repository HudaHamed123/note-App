import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators}from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  private readonly toastrService=inject(ToastrService)
  isLoading:boolean=false
   successMsg:string=''
   errMsg:string=''
loginForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required ,Validators.email]),
    password:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)]),
})

submitLoginForm():void{
 if (this.loginForm.valid) {
  this.isLoading =true;
  this.authService.sendLoginData(  this.loginForm.value).subscribe({
    next:(res)=>{
if (res.msg==='done') {
  console.log(res); 
  // save token
  localStorage.setItem('userToken',res.token)
  // toaster
  this.toastrService.success(res.msg , "GoodNotes")
  this.authService.saveUserToken()
  //navigate to home
  setTimeout(() => {
    this.router.navigate(['/home'])
  }, 700);
 
  this.successMsg=res.msg

}
this.isLoading =false

    },error:(err:HttpErrorResponse)=>{
      console.log(err);
      this.errMsg=err.error.msg;
      this.isLoading =false
    }
  })
 }else{
  this.loginForm.markAllAsTouched()
 }

}
}
