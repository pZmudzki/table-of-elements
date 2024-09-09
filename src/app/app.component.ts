import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodicElement';
import { DataService } from '../services/dataService';
import { ProgressSpinner } from './progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-root',
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [MatTableModule, ProgressSpinner],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  dataService = new DataService();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data: PeriodicElement[] = [];

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.data = this.dataService.getData();
      this.loading = false;
    }, 2000);
  }
}
