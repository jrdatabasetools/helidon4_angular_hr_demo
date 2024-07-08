import {ApplicationConfig} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), provideAnimationsAsync()]
};
