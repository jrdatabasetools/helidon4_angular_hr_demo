import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [AppComponent, BrowserModule, BrowserAnimationsModule, NgbModule],
  providers: [],
  declarations: [],
  exports: [],
  bootstrap: []
})
export class AppModule {
}
