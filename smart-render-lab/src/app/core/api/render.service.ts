import { inject, Injectable } from '@angular/core';
import { AppsettingsService } from './appsettings.service';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';
import { AIImageRequestDTOModel } from '../DTOs/image-generateDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  private http = inject(HttpClient);
  private _settingsService = inject(AppsettingsService);

  private headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

  getRTProjectRender(projXml: string): Observable<ArrayBuffer> {
    const url = `${this._settingsService.KitsWebApiUrl}projects/render?ftype=kits&height=1000&width=1000`;

    return this.http.post(url, projXml, {
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false),
      responseType: 'arraybuffer'
    });
  }

  postSmartImageGenerate(projXml: string): Observable<Object> {
    const url = `${this._settingsService.KitsWebApiUrl}ai/image/generate`;

    let reqBody = new AIImageRequestDTOModel(projXml);
    console.log(reqBody);
    console.log({AIImageRequest: reqBody });

    return this.http.post(url, {AIImageRequest: reqBody }, {
      headers: this.headers,
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false)
    });
  }
}