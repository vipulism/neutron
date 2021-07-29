import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarItemModel, DeleteParam, UpdateItem } from './../../models/toolbar.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { combineLatest, Observable, Subscription } from 'rxjs';



@Component({
    selector: 'form-fields',
    templateUrl: 'form-fields.component.html'
})



export class FormFieldsComponent implements OnInit {

    @Input() item!: ToolbarItemModel;
    @Input() itemIndex!: number;
    @Input() sectionIndex!:number;

    @Output('delete') delete = new EventEmitter<DeleteParam>()
    @Output('update') update = new EventEmitter<UpdateItem>()
        
    form!:FormGroup;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    
    subscription!:Subscription

    constructor(private formBuilder:FormBuilder) { }


    ngOnInit() {
        this.formInit()
     }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

     formInit(){
         this.form = this.formBuilder.group({
             label:[
                this.item.label,
                 {validators:[Validators.required]}
            ],
            type:[this.item.type]
         },  { updateOn: 'blur' })



         switch (this.item.type) {
            case 'CHECK_BOX':
            case 'SINGLE_SELECT':
            case 'RADIO':
                this.form.addControl('options', this.formBuilder.array((this.item.options || []), Validators.required))
                 break;
         
             default:
                 break;
         }

      
         this.subscription = this.form.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
         ).subscribe(val => {
             console.log(val);
            this.onChange(val)
         })
     }

     get formOptions(): FormArray {
        return this.form.controls.options as FormArray;
      }

     addOption(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    
        // Add our fruit
        if ((value || "").trim()) {
          this.formOptions.push(this.formBuilder.control(value));
        }
    
        // Reset the input value
        if (input) {
          input.value = "";
        }
      }
    
      removeOption(fruit: string): void {
        const index = this.formOptions.value.indexOf(fruit);
        if (index >= 0) {
          this.formOptions.removeAt(index);
        }
      }
    
       

     onDelete(){
         this.delete.emit({sectionIndex:this.sectionIndex, itemIndex:this.itemIndex})
     }


     onChange(item:ToolbarItemModel){
         this.update.emit({
            sectionIndex:this.sectionIndex,
            itemIndex:this.itemIndex,
            item
         })
     }


}