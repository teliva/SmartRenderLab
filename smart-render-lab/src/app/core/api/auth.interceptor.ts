import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { IS_PUBLIC_REQUEST } from './public-routes-flag';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(req);
    if (req.context.get(IS_PUBLIC_REQUEST)) {
        console.log('going next');
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