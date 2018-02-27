import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeoutComponent } from './timeout';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TimeoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
