import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {PlanetService} from '../../services/PlanetService';
import {FormControl, Validators} from '@angular/forms';
import {PlanetModel} from '../../model/PlanetModel';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlanetModel,
              public dataService: PlanetService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.vertexId,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('vertexId') ? 'Not a valid vertexId' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addPlanet(this.data);
  }
}
