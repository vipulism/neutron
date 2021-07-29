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
    formBuilt = false
   
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
        this.setupForm();
        this.addSection();
     }

     /**
      * This function is used to set data if previously saved 
      *
      * @memberof HomeComponent
      */
     setupForm(){
        const savedForm = localStorage.getItem('forms') 
        if(savedForm){
            this.sectionList = JSON.parse(savedForm) 
        }
     }

    /**
     * This function will trigger whenever user drop item in section
     *
     * @param {CdkDragDrop<ToolbarItemModel[]>} event
     * @memberof HomeComponent
     */
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

    /**
     * This Function is used add section
     *
     * @memberof HomeComponent
     */
    addSection():void{
        const newItem:dragDropList = {
            id:`section-${this.sectionList.length}`,
            elements:[]
        }

        this.sectionList.push(newItem)
    }

    /**
     * This function is used to remove section
     *
     * @param {number} secIndex
     * @memberof HomeComponent
     */
    removeSection(secIndex:number):void{
        this.sectionList.splice(secIndex, 1)
        console.log(this.sectionList);
        
    }
 


      /**
       * This functions is used to restrict drop items in toolbar area
       *
       * @return {*}  {boolean}
       * @memberof HomeComponent
       */
      noReturnPredicate():boolean {
        return false;
      }

      /**
       * This function is used to delete form field in section
       *
       * @param {DeleteParam} params
       * @memberof HomeComponent
       */
      deleteItem(params:DeleteParam):void{
          this.sectionList[params.sectionIndex].elements.splice(params.itemIndex, 1)
      }

      /**
       * This functions is used to updated form
       *
       * @param {UpdateItem} params
       * @memberof HomeComponent
       */
      updateItem(params:UpdateItem):void{
         this.sectionList[params.sectionIndex].elements[params.itemIndex] = { ...this.sectionList[params.sectionIndex].elements[params.itemIndex], ...params.item}
      }

    /**
     * This function is used to save form data in localstorage 
     *
     * @memberof HomeComponent
     */
    saveForm():void{
        console.log(this.sectionList);
        localStorage.setItem('forms', JSON.stringify(this.sectionList))
    }

    /**
     * This functions is handle data after a new form field added 
     *
     * @param {*} event
     * @memberof HomeComponent
     */
    onFieldAdd(event:any):void{
        console.log(event);
        
    }

    /**
     * This function is used to convert form labe in to camel case 
     *
     * @param {string} str
     * @return {*}  {string}
     * @memberof HomeComponent
     */
    camelize(str:string):string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      }

    /**
     * This function us used to build final form 
     *
     * @memberof HomeComponent
     */
    buildForm():void{
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
       this.formBuilt = true
    }

   /**
    * This method is used to get labels for final form
    *
    * @readonly
    * @type {ToolbarItemModel[]}
    * @memberof HomeComponent
    */
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