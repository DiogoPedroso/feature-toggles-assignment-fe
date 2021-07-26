import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from 'src/app/models/feature';

@Component({
  selector: 'feature-from-dialog',
  templateUrl: 'feature-from-dialog.component.html',
  styleUrls: ['./feature-from-dialog.component.scss'],
})
export class FeatureFormDialog implements OnInit {
  featureForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FeatureFormDialog>,
    @Inject(MAT_DIALOG_DATA) public feature: Feature,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.featureForm = this.fb.group({
      displayName: this.feature.displayName,
      technicalName: this.feature.technicalName,
      description: this.feature.description,
      expiresOn: this.feature.expiresOn,
      inverted: this.feature.inverted,
      customerIds: this.fb.array(this.feature.customerIds)
    });
  }

  get customerIds(): FormArray {
    return this.featureForm.get('customerIds') as FormArray;
  }

  addCustomerIdLine() {
    this.customerIds.push(new FormControl());
  }

  close(submit: boolean) {
    if (submit) {
      let updatedfeature = Object.assign(this.feature, this.featureForm.value);
      this.dialogRef.close(updatedfeature);
    } else {
      this.dialogRef.close();
    }
  }
}
