import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(IS_PUBLIC_REQUEST)) {
        return next(req);
    }
    
    const authService = inject(AuthorizationService);

    const token = authService.getToken();

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq);
};