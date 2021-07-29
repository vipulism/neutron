



export type ToolbarItemType = 'TEXT_INPUT'  | 'SINGLE_SELECT' | 'CHECK_BOX' | 'DATE' | 'RADIO';



export interface ToolbarItemModel {
    type:ToolbarItemType;
    title?:string;
    icon?:string;
    label?:string;
    options?:string[]
}

export interface DeleteParam {
    sectionIndex:number;
    itemIndex:number
}

export interface UpdateItem extends DeleteParam {
    item:ToolbarItemModel
}
