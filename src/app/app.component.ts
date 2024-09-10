import { Component, OnInit, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  PeriodicElement,
  PeriodicElementsColumns,
} from '../models/periodicElement';

import { DataService } from '../services/dataService';
import { ProgressSpinner } from './progress-spinner/progress-spinner.component';

import {
  EditDialog,
  type DialogData,
} from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-root',
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    ProgressSpinner,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TitleCasePipe,
  ],
})
export class AppComponent implements OnInit {
  // Loading state
  loading: boolean = false;

  // Subject for input debounce
  searchInput = new Subject<string>();

  // make a new instance of "database" because if this was a injected dependency it would have to save edited value somewhere
  dataService = new DataService();

  // Table data
  displayedColumns: string[] = PeriodicElementsColumns;
  data: PeriodicElement[] = [];

  // Filter
  filter: string = '';

  // Edit dialog necessary data
  readonly value = signal('');
  readonly column = model('');
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.simulateFetchingData();

    // Input debounce in=mplementation
    this.searchInput.pipe(debounceTime(2000)).subscribe((filter: string) => {
      // Call your search function here
      this.simulateFetchingData(filter);
    });
  }

  onInputChange(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value;
    this.searchInput.next(this.filter);
  }

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(EditDialog, {
      data,
    });

    // find element in data array by position col/id
    const foundElement: PeriodicElement = this.data.find(
      (element) => element.position === data.id
    )!;

    // handle dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        // update element with the result from dialog
        const editedElement = {
          ...foundElement,
          [data.column]: result,
        };

        // update data in "database"
        this.dataService.editData(editedElement);
        // get data again
        this.simulateFetchingData(this.filter);
      }
    });
  }

  // Simulate fetching data from a server
  simulateFetchingData(filter?: string): void {
    this.loading = true;
    setTimeout(() => {
      this.data = this.dataService.getData(filter);
      this.loading = false;
    }, 1000);
  }
}
