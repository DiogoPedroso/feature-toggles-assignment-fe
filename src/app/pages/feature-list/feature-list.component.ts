import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Feature } from 'src/app/models/feature';
import { FeatureService } from 'src/app/services/features.service';
import { FeatureFormDialog } from './dialog/feature-from-dialog.component';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  featuresArray: Feature[] = [];
  displayedColumns: string[] = [
    'id',
    'displayName',
    'technicalName',
    'description',
    'expiresOn',
    'inverted',
    'customersId',
    'archived',
    'actions',
  ];
  isMobile: boolean;
  mobileWidthMQuery = '(max-width: 1199px)';

  constructor(
    public dialog: MatDialog,
    private featureService: FeatureService,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isMobile = this.breakpointObserver.isMatched(this.mobileWidthMQuery);

    const layoutChanges = this.breakpointObserver.observe(
      this.mobileWidthMQuery
    );

    layoutChanges.subscribe((result) => {
      this.isMobile = result.matches;

      if(result.matches) {
        this.displayedColumns = [
          'technicalName',
          'expiresOn',
          'actions',
        ];
      } else {
        this.displayedColumns = [
          'id',
          'displayName',
          'technicalName',
          'description',
          'expiresOn',
          'inverted',
          'customersId',
          'archived',
          'actions',
        ];
      }
    });
  }

  ngOnInit(): void {
    this.getFeatures()
      .pipe(
        catchError(() => {
          this._snackBar.open('Something went wrong', 'OK', {
            duration: 3000,
          });
          throw new Error('Something went wrong');
        })
      )
      .toPromise()
      .then();
  }

  openDialog(feature?: Feature) {
    let isEdit = feature ? true : false;
    let element = isEdit
      ? feature
      : ({
          id: '',
          displayName: '',
          technicalName: '',
          expiresOn: new Date(),
          description: '',
          inverted: false,
          customerIds: [],
          archived: false,
        } as Feature);
    const dialogRef = this.dialog.open(FeatureFormDialog, {
      data: element,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result != undefined) {
            if (!isEdit) {
              return this.addFeature(result);
            } else {
              return this.editFeature(result);
            }
          }else{
            return of(undefined);
          }
        }),
        switchMap(() => {
          return this.getFeatures();
        }),
        catchError((err) => {
          this._snackBar.open('Something went wrong', 'OK', {
            duration: 3000,
          });
          throw new Error('Something went wrong');
        })
      )
      .toPromise()
      .then();
  }

  getFeatures() {
    return this.featureService.getFeatures().pipe(
      tap((res) => {
        this.featuresArray = res;
      })
    );
  }

  archiveFeature(id: string) {
    this.featureService
      .archiveFeature(id)
      .pipe(
        tap((res) => {
          this._snackBar.open('Feature Archived', 'OK', {
            duration: 3000,
          });
        }),
        catchError((err) => {
          this._snackBar.open('Something went wrong', 'OK', {
            duration: 3000,
          });
          throw new Error('Something went wrong');
        })
      )
      .toPromise()
      .then();
  }

  addFeature(feature: Feature) {
    return this.featureService.addFeature(feature).pipe(
      tap(() => {
        this._snackBar.open('New Feature Add', 'OK', {
          duration: 3000,
        });
      })
    );
  }

  editFeature(feature: Feature) {
    return this.featureService.updateFeature(feature).pipe(
      tap((res) => {
        this._snackBar.open('Updated Feature', 'OK', {
          duration: 3000,
        });
      })
    );
  }
}
