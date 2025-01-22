import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';


import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core';
export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
       provideHttpClient(withInterceptors([authInterceptor])),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ]
};


