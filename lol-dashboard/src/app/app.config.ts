import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {ChampionDataService} from './services/champion-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(ChampionDataService, { delay: 100 })
    ),
  ]
};
