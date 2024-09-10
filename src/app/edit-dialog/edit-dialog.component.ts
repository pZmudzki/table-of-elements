import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  key: string;
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
