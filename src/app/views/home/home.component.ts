import { ToolbarItemModel, DeleteParam, UpdateItem } from './../../shared/models/toolbar.model';
import { moveItemInArray, transferArrayItem, CdkDragDrop, copyArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



interface dragDropList {
    id:string;
    elements:ToolbarItemModel[]
}


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    neutronForm!:FormGroup;

    @ViewChild('dropList', { read:CdkDropList}) dropList : CdkDropList
   
    constructor(
        private formBuilder: FormBuilder
    ) { }
        

    elements:ToolbarItemModel[] = [
        {
            title:'Text Box',
            type:'TEXT_INPUT',
            icon:'text_fields'
        },
        {
            title:'Check Box',
            type:'CHECK_BOX',
            icon:'check_box',
            options:[]
        },
        {
            title:'Radio Box',
            type:'RADIO',
            icon:'radio_button_checked',
            options:[]
        },
        {
            title:'Select Box',
            type:'SINGLE_SELECT',
            icon:'list_alt',
            options:[]
        },{
            title:'Date Picker',
            type:'DATE',
            icon:'event',
        }
    ];
     


    sectionList:dragDropList[] = []
    
    form!:FormGroup
        

    ngOnInit() {
        this.setForm()
     }

     setForm(){
        const savedForm = localStorage.getItem('forms')
        if(savedForm){
            this.sectionList = JSON.parse(savedForm) 
        }
     }

    drop(event: CdkDragDrop<ToolbarItemModel[]>):void {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {


          copyArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);

                            
        }
    }

    addSection():void{
        const newItem:dragDropList = {
            id:`section-${this.sectionList.length}`,
            elements:[]
        }

        this.sectionList.push(newItem)
    }

    removeSection(secIndex:number):void{
        this.sectionList.splice(secIndex, 1)
        console.log(this.sectionList);
        
    }

    drop2(event: CdkDragDrop<ToolbarItemModel[]>):void {
        debugger
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {


          copyArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);

                            
        }
    }


      noReturnPredicate() {
        return false;
      }

      deleteItem(params:DeleteParam){
          this.sectionList[params.sectionIndex].elements.splice(params.itemIndex, 1)
      }

      updateItem(params:UpdateItem){
         this.sectionList[params.sectionIndex].elements[params.itemIndex] = { ...this.sectionList[params.sectionIndex].elements[params.itemIndex], ...params.item}
       
      }

    saveForm(){
        console.log(this.sectionList);
        localStorage.setItem('forms', JSON.stringify(this.sectionList))
    }

    onFieldAdd(event:any){
        console.log(event);
        
    }

    camelize(str:string):string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      }

    buildForm(){
        this.form = this.formBuilder.group({})

         this.sectionList.map(section => {
            section.elements.reduce((group:any, field:ToolbarItemModel) => {
                if(field.label){
                    this.form.addControl(this.camelize(field.label), this.formBuilder.control('', Validators.required))
                }
                return group
            },{})
        })
        
       console.log(this.form.value);
       
    }

   get getFieldList():ToolbarItemModel[]{

        const arr:ToolbarItemModel[] = []
         this.sectionList.forEach(sec => {
            sec.elements.forEach(elm => {
                arr.push(elm)
            })
        })
        
        return arr
    }

}