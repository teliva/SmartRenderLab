import { inject, Injectable } from '@angular/core';
import { AppsettingsService } from './appsettings.service';
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';
import { AIImageRequest } from '../DTOs/AIImageRequest.model';
import { js2xml } from 'xml-js';
import { ImageGenerationResponse } from '../DTOs/Responses/image-generateResponse.interface';

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

  postSmartImageGenerate(projXml: string): Observable<ImageGenerationResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Accept': 'application/json'
    });

    const url = `${this._settingsService.KitsWebApiUrl}ai/image/generate`;

    let reqBody = new AIImageRequest(projXml);

    const xmlString = js2xml({ AIImageRequest: reqBody }, { compact: true, spaces: 4 });

    return this.http.post<ImageGenerationResponse>(url, xmlString, {
      headers: headers,
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false)
    });
  }
}