import { Component, OnInit, inject, model, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { PeriodicElement } from '../models/periodicElement';

import { DataService } from '../services/dataService';
import { ProgressSpinner } from './progress-spinner/progress-spinner.component';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  EditDialog,
  type DialogData,
} from './edit-dialog/edit-dialog.component';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  ],
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  searchInput = new Subject<string>();

  // make a new instance of "database" because if this was a injected dependency it would have to save edited value somewhere
  dataService = new DataService();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data: PeriodicElement[] = [];

  readonly value = signal('');
  readonly key = model('');
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
    const filter = (event.target as HTMLInputElement).value;
    this.searchInput.next(filter); //     implement debounce here
  }

  openDialog(data: DialogData): void {
    console.log(data);
    const dialogRef = this.dialog.open(EditDialog, {
      data: { key: this.key(), value: this.key() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.value.set(result);
      }
    });
  }

  simulateFetchingData(filter?: string): void {
    this.loading = true;
    setTimeout(() => {
      this.data = this.dataService.getData(filter);
      this.loading = false;
    }, 1000);
  }
}
