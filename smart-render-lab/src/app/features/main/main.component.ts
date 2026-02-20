import { Component, OnInit, inject } from '@angular/core';
import format from 'xml-formatter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
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
  public backgroundKeyPhrasese =
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
        indentation: '  ', // Two spaces
        filter: (node) => true, // Optional: filter nodes
        collapseContent: true, // Keeps short tags on one line
        lineSeparator: '\n'
      });
    } catch (e) {
      this.isXmlValid = false;
      console.error("Invalid XML provided", e);
      return "Error parsing XML.";
    }
  }
}
