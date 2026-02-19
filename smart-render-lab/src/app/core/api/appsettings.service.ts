import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';

interface AppSettings {
  KitsWebApiUrl: string;
  SmartRenderApi: string;
}

@Injectable({
  providedIn: 'root'
})

export class AppsettingsService {
  constructor() { }
  private http = inject(HttpClient);

  private _settings?: AppSettings;

  loadSettings(): Promise<AppSettings> {
    const settings$ = this.http.get<AppSettings>('/appsettings.json', {
        context: new HttpContext().set(IS_PUBLIC_REQUEST, true)
    }).pipe(
      tap(data => this._settings = data)
    );
    
    return lastValueFrom(settings$);
  }

  get smartRenderUrl(): string {
    const url = this._settings?.SmartRenderApi;

    if (!url) {
      throw new Error("SmartRenderApi setting is missing. Check appsettings.json.");
    }

    return url;
  }

  get KitsWebApiUrl(): string {
    const url = this._settings?.KitsWebApiUrl;

    if (!url) {
      throw new Error("KitsWebApiUrl setting is missing. Check appsettings.json.");
    }

    return url;
  }
}
