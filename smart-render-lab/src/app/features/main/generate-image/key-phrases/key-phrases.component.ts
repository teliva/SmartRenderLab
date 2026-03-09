import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-key-phrases',
  imports: [],
  templateUrl: './key-phrases.component.html',
  styleUrl: './key-phrases.component.css'
})
export class KeyPhrasesComponent {
  @HostBinding('class') hostClasses = 'col-5 m-3 p-3 bg-body rounded shadow-sm user-select-none';
  @Input() phrases: string[] = [];
  @Input() title: string = '';

  public selectedPhrases:  string[] = [];

  handleButtonAdd(phrase: string): void {
    this.phrases = this.phrases.filter(item => item !== phrase);
    this.selectedPhrases.push(phrase);
  }

  handleButtonRemove(phrase: string): void {
    this.selectedPhrases = this.selectedPhrases.filter(item => item !== phrase);
    this.phrases.push(phrase);
  }
}