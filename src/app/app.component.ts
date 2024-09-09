import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodicElement';
import { DataService } from '../services/dataService';

@Component({
  selector: 'app-root',
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class AppComponent {
  dataService = new DataService();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = this.dataService.getData();
}
