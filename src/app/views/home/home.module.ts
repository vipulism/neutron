import { BrowserModule } from '@angular/platform-browser';
import { SharedComponentModule } from './../../shared/components/shared-component.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppSharedModule } from './../../shared/app-shared.module';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';


@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        AppSharedModule,
        SharedComponentModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
