import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  const platForm =inject(PLATFORM_ID);
 if (isPlatformBrowser(platForm)) {
  if (localStorage.getItem('userToken')!==null) {
    return true
  }else{
    
    router.navigate(['/login'])
    return false
  }
 } else{
  return true
 }

};
