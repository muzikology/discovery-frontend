import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {PlanetService} from '../../services/PlanetService';
import {FormControl, Validators} from '@angular/forms';
import { ShortestPathModel } from 'src/app/model/ShortestPathModel';

@Component({
  selector: 'app-shortestpath.dialog',
  templateUrl: '../../dialogs/shortestpath/shortestpath.dialog.html',
  styleUrls: ['../../dialogs/shortestpath/shortestpath.dialog.css']
})

export class ShortestPathDialogComponent {
  constructor(public dialogRef: MatDialogRef<ShortestPathDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ShortestPathModel,
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

  public findShortestPath(): void {
    this.data.destinationVertex ='';
    this.data.selectedVertexName='';
    this.data.sourceVertex = '';
    this.data.thePath = '';
    this.data.trafficAllowed = false;
    this.data.undirectedGraph = false;
    this.data.vertexName='';

    this.dataService.findShortestPath(this.data);
  }
}
