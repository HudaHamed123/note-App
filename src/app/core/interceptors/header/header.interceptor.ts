import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
const pLATFORM_ID =inject(PLATFORM_ID)
if (isPlatformBrowser(pLATFORM_ID)) {
  if (localStorage.getItem('userToken')!==null) {
    req= req.clone({
      setHeaders:{
  Token:`3b8ny__${localStorage.getItem('userToken')!}`
      }
    })
  }
}
  return next(req);
};
