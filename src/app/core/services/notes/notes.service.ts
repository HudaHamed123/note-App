import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor( private httpClient:HttpClient) { }
  addNewNote(data:object):Observable<any>{
    return this.httpClient.post(`${environments.baseUrl}/api/v1/notes`, data ,
      {
        headers:{
          token:localStorage.getItem('userToken')!
        }
      }
    )
  }
  getUserNotes():Observable<any>{
    return this.httpClient.get(`${environments.baseUrl}/api/v1/notes`)
  }
  upDateUserNotes(data:object , id:string):Observable<any>{
    return this.httpClient.put(`${environments.baseUrl}/api/v1/notes/${id}`,data)
  }
  deleteUserNotes(id:string):Observable<any>{
    return this.httpClient.delete(`${environments.baseUrl}/api/v1/notes/${id}`)
  }
}
