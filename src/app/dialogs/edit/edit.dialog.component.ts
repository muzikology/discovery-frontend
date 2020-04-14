import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {PlanetService} from '../../services/PlanetService';
import {FormControl, Validators} from '@angular/forms';
import { PlanetModel } from 'src/app/model/PlanetModel';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlanetModel, public dataService: PlanetService) { }

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

  startEdit(): void {
    this.dataService.updatePlanet(this.data);
  }
}
