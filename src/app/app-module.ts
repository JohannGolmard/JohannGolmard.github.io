import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxTypedJsModule} from 'ngx-typed-js';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { ScrollReveal } from './scroll-reveal';
import { NetworkBackground } from './network-background/network-background';

@NgModule({
  declarations: [
    App,
    Home,
    ScrollReveal,
    NetworkBackground
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
