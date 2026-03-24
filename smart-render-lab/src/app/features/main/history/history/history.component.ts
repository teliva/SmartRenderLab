import { Component, inject } from '@angular/core';
import { GenImgService } from '../../../../core/services/gen-img.service';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GenImage } from '../../../../core/services/gen-img.model';

@Component({
  selector: 'app-history',
  imports: [AsyncPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent {
  private _genImgService = inject(GenImgService);
  public charLimit: number = 0;
  imagesHistory$ = this._genImgService.imgState$;

  constructor(private sanitizer: DomSanitizer) { }

  onTextInputChange(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.charLimit = ele.value.length;
  }

  getSafeUrl(imgData: GenImage): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:${imgData.mimeType};base64,${imgData.based64Image}`);
  }
}