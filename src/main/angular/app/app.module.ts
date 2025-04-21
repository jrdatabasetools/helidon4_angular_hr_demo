import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [AppComponent, BrowserAnimationsModule, NgbModule],
  providers: [provideHttpClient()],
  declarations: [],
  exports: [],
  bootstrap: []
})
export class AppModule {
}
