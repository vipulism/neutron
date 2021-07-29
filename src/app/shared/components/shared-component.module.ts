import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TextEditComponent } from './formFields/edit/textEdit.component';
import { MaterialModule } from './../material.module';
import { FormFieldsComponent } from './formFields/form-fields.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.compoent';
import { NgModule } from "@angular/core";

const components = [
    HeaderComponent,
        FooterComponent,
        SidebarComponent,
        FormFieldsComponent,
        TextEditComponent,
        FormRendererComponent
]


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        ...components
    ],
    exports: [ ...components],
    providers: []
})
export class SharedComponentModule { }