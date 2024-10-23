import { Component } from '@angular/core';
import { MessageservService } from '../messageserv.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-message.component.html',
  styles: ``
})
export class ListMessageComponent {
  
  constructor(public messageService: MessageservService) { }

}



