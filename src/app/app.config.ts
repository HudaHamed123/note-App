import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes , withViewTransitions() ,withInMemoryScrolling({scrollPositionRestoration:'top'}) , withHashLocation()) , provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() ,withInterceptors([headerInterceptor , errorsInterceptor , loadingInterceptor]) ) ,
    provideAnimations(), 
    provideToastr(),
    importProvidersFrom( NgxSpinnerModule)
  ]
};


