import { Component, inject } from '@angular/core';
import { GenImgService } from '../../../../core/services/gen-img.service';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent {
  private _genImgService = inject(GenImgService);
  public charLimit: number = 0;
  images$ = this._genImgService.imgState$;

  onTextInputChange(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.charLimit = ele.value.length;
  }
}