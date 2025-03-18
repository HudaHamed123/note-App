import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import path from 'path';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';

import { NotesComponent } from './pages/notes/notes.component';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authguardGuard } from './core/guard/authguard/authguard.guard';
import { loggedGuard } from './core/guard/logged/logged.guard';

export const routes: Routes = [
    {path:'', 
    redirectTo: 'home',
    pathMatch:'full'},
   {path:'',component:AuthLayoutComponent,
    canActivate:[loggedGuard]
    ,children:[
        {path:'register', component:RegisterComponent , title:'register'},
        {path:'login',component:LoginComponent ,title:'login'}

    ]
   } ,
   {path:'',component:MainLayoutComponent,
    canActivate:[authguardGuard],
    children:[
        {path:'home' , component:HomeComponent ,title:'home'},
       
        {path:'notes' , component:NotesComponent ,title:'notes'},

    ]
   },
   {path:'**', component:NotfoundComponent,title:'error'}
];
