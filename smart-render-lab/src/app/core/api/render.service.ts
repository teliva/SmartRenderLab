import { inject, Injectable } from '@angular/core';
import { AppsettingsService } from './appsettings.service';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';
import { AIImageRequest } from '../DTOs/AIImageRequest.model';
import { js2xml } from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  private http = inject(HttpClient);
  private _settingsService = inject(AppsettingsService);

  getRTProjectRender(projXml: string): Observable<ArrayBuffer> {
    const url = `${this._settingsService.KitsWebApiUrl}projects/render?ftype=kits&height=1000&width=1000`;

    return this.http.post(url, projXml, {
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false),
      responseType: 'arraybuffer'
    });
  }

  postSmartImageGenerate(projXml: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml'
    });

    const url = `${this._settingsService.KitsWebApiUrl}ai/image/generate`;

    let reqBody = new AIImageRequest(projXml);

    const xmlString = js2xml({ AIImageRequest: reqBody }, { compact: true, spaces: 4 });

    return this.http.post(url, xmlString, {
      headers: headers,
      responseType: 'blob',
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false)
    });
  }
}