import { Component } from '@angular/core';
import { MessageservService } from '../messageserv.service';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [],
  templateUrl: './add-message.component.html',
  styles: ``
})
export class AddMessageComponent {

  constructor(public messageService: MessageservService) { }
  alumno:string="";

  addAlumno(){
    this.messageService.add(this.alumno);
    this.alumno=""
  }

}
