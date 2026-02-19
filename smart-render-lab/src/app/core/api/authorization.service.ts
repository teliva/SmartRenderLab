import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { AppsettingsService } from './appsettings.service';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';

interface AuthResponse {
  accessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private http = inject(HttpClient);
  private _accessToken?: string;
  private _settingsService = inject(AppsettingsService);
  
  authorize(): Observable<AuthResponse> {
    const url = `${this._settingsService.smartRenderUrl}api/v1/auth/token`;
    return this.http.get<AuthResponse>(url, {
      context: new HttpContext().set(IS_PUBLIC_REQUEST, true)
    }).pipe(
      tap((response) => {
        this._accessToken = response.accessToken;
      })
    );
  }

  getToken(): string | undefined {
    this.authorize();
    return this._accessToken;

  }
}