import { Component, inject } from '@angular/core';
import format from 'xml-formatter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RenderService } from '../../core/api/render.service';
import { KeyPhrasesComponent } from "./generate-image/key-phrases/key-phrases.component";

@Component({
  selector: 'app-main',
  imports: [KeyPhrasesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  private _renderService = inject(RenderService);
  private modalService = inject(NgbModal);
  public formattedXml: string = "";
  public rawXml: string = "";
  public isXmlValid: boolean = false;
  
  public environmentKeyPhrases =
    [
      'Open Office',
      'Acoustic Ceiling Tiles',
      'Exposed Ceilings (Open Plenums)',
      'Floor-To-Ceiling Window',
      'Polished/Sealed Concrete flooring',
      'Hardwood flooring',
      'No furniture',
      '20 foot ceiling Height'
    ];
  public backgroundKeyPhrases =
    [
      'None',
      'Environment',
      'Blur'
    ];

  onInputChange(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.rawXml = ele.value;

    this.formattedXml = this.beautify(ele.value);
  }
  open(content: any) {
    this.modalService.open(content);
  }

  beautify(rawXml: string): string {
    try {
      this.isXmlValid = true;
      return format(rawXml, {
        indentation: '  ',
        filter: (node) => true,
        collapseContent: true,
        lineSeparator: '\n'
      });
    } catch (e) {
      this.isXmlValid = false;
      console.error("Invalid XML provided", e);
      return "Error parsing XML.";
    }
  }
}
