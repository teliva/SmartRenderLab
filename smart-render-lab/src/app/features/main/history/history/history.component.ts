import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent {
  public charLimit: number = 0;
  
  onTextInputChange(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.charLimit = ele.value.length;    
  }
}
