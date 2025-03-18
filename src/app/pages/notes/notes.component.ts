import { Component, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { log } from 'util';
import { isPlatformBrowser } from '@angular/common';
import { Inotes } from '../../shared/interfaces/inotes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  private readonly notesService =inject(NotesService)
  private readonly _PLATFORM_ID =inject(PLATFORM_ID)
  private readonly toastrService =inject(ToastrService)
  noteData:Inotes[]=[] ;
  noteId:string=''
  @ViewChild('updateModel')myEle!:ElementRef;

  addForm:FormGroup=new FormGroup({
    title:new FormControl(null , [Validators.required]),
    content:new FormControl(null ,[Validators.required]),
})

upDateForm:FormGroup=new FormGroup({
  title:new FormControl(null , [Validators.required]),
  content:new FormControl(null ,[Validators.required]),
})
ngOnInit(): void {
  if (isPlatformBrowser(this._PLATFORM_ID)) {
    this.getAllUserNotes(); 
  }
}

getAllUserNotes():void{
  this.notesService.getUserNotes().subscribe({
    next:(res)=>{
      console.log(res);
      this.noteData=res.notes
      
    },error:(err)=>{
      if (err.error.msg=== 'Not Notes Found') {
        this.noteData=[];
      }
    }
  })
}
submitAddForm():void{
  this.notesService.addNewNote(this.addForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.addForm.reset()
      this.getAllUserNotes()
      this.toastrService.success(res.msg,'GoodNotes')
    
    }
  })
}
showModel():void{
const model = this.myEle.nativeElement as HTMLElement
model.classList.remove('d-none')
}
hideModel():void{
  const model = this.myEle.nativeElement as HTMLElement
model.classList.add('d-none')
}
@HostListener('document:click' , ['$event']) onClick (e:PointerEvent){
  if (e.target===this.myEle.nativeElement) {
    this.hideModel
    
  }
}

setFormData(note:any ,id:string):void{
  this.noteId =id
this.upDateForm.patchValue({
  title:note.title,
  content:note.content
})
}

submitUpDateForm():void{
  this.notesService.upDateUserNotes(this.upDateForm.value,this.noteId).subscribe({
    next:(res)=>{
console.log(res);
this.getAllUserNotes()
this.upDateForm.reset()
this.hideModel();


    }
  })
}
deleteSpecificNote(id:string):void{
  this.notesService.deleteUserNotes(id).subscribe({
    next:(res)=>{
console.log(res);
this.getAllUserNotes()

    }
  })
}
}





