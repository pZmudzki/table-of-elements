import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * @title Basic progress-spinner
 */
@Component({
  selector: 'progress-spinner',
  templateUrl: 'progress-spinner.html',
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class ProgressSpinner {}
