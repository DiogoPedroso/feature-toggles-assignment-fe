import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '../components/components.module';
import { FeatureFormDialog } from './dialog/feature-from-dialog.component';
import { FeatureListingRoutingModule } from './feature-list-routing.module';
import { FeatureListComponent } from './feature-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FeatureListComponent, FeatureFormDialog],
  imports: [
    CommonModule,
    FeatureListingRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule,
    LayoutModule,
  ],
})
export class FeatureListModule {}
