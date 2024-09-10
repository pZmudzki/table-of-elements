import { Component, inject, model } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  id: number;
  column: string;
  value: string | number;
}

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TitleCasePipe,
  ],
})
export class EditDialog {
  readonly dialogRef = inject(MatDialogRef<EditDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly value = model(this.data.value);

  onCancel(): void {
    this.dialogRef.close();
  }
}
