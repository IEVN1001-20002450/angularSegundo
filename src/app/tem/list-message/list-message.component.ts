import { Component } from '@angular/core';
import { MessageservService } from '../messageserv.service';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [],
  templateUrl: './list-message.component.html',
  styles: ``
})
export class ListMessageComponent {
  constructor(public messageService: MessageservService) { }
  alumno:string="";
  
    addAlumno(){
      this.messageService.add(this.alumno);
      this.alumno=""
  }

}
