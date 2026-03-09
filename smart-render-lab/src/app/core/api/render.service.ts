import { inject, Injectable } from '@angular/core';
import { AppsettingsService } from './appsettings.service';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';

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

  postSmartImageGenerate(projXml: string): Observable<Object>{
    const url = `${this._settingsService.KitsWebApiUrl}ai/image/generate`;

    return this.http.post(url, projXml, {
      context: new HttpContext().set(IS_PUBLIC_REQUEST, false)
    });
  }
}