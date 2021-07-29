import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'text-Edit',
    templateUrl: 'textEdit.component.html'
})

export class TextEditComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<TextEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
      }
}