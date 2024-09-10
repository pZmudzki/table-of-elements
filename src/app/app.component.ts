import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodicElement';
import { DataService } from '../services/dataService';
import { ProgressSpinner } from './progress-spinner/progress-spinner.component';
import { MatInputModule } from '@angular/material/input';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [MatTableModule, MatInputModule, ProgressSpinner],
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  searchInput = new Subject<string>();

  // make a new instance of "database" because if this was a injected dependency it would have to save edited value somewhere
  dataService = new DataService();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data: PeriodicElement[] = [];

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

  simulateFetchingData(filter?: string): void {
    this.loading = true;
    setTimeout(() => {
      this.data = this.dataService.getData(filter);
      this.loading = false;
    }, 1000);
  }
}
