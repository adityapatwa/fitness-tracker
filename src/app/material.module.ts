import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule

  ],
  exports: [
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule
  ]
})
export class MaterialModule {

}
