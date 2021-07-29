import { ToolbarItemModel } from './../../models/toolbar.model';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html'
})

export class FormRendererComponent implements OnInit {

    @Input() form!:FormGroup;
    @Input() fieldList!:ToolbarItemModel[];
    
    labels!:string[]
    constructor() { }

    ngOnInit() {

        this.labels = Object.keys(this.form.value)
     }

     frmSubmit(){
         console.log(this.form.value);
         
     }
}