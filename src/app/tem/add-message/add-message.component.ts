import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageservService } from '../messageserv.service';
 
@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styles: ``
})
export class AddMessageComponent implements OnInit {
  alumno:string="";
 
  formGroup!: FormGroup;
 
  constructor(private readonly fb: FormBuilder, public messageService: MessageservService){}
 
   
 
    ngOnInit():void{
      this.formGroup= this.initForm()
    }
   
    initForm():FormGroup{
      return this.fb.group({
        nombre:[''],
      })
    }
 
    addAlumno(){
      let{nombre} = this.formGroup.value;
      this.messageService.add(nombre);
      this.formGroup.get('nombre')?.setValue('')
    }
 
 
}