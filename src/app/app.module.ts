import { CommonModule } from '@angular/common';
import { SharedComponentModule } from './shared/components/shared-component.module';
import { AppSharedModule } from './shared/app-shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppSharedModule,
    SharedComponentModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports:[AppSharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
