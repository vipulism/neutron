import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedComponentModule } from "./components/shared-component.module";
import { MaterialModule } from "./material.module";

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [],
    exports: [MaterialModule],
    providers: []
})
export class AppSharedModule { }
