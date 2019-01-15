import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor (private snackBar: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top'
    })
  }
}
