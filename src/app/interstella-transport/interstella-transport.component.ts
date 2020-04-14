import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlanetModel} from '../model/PlanetModel';
import { PlanetService } from '../services/PlanetService';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ShortestPathDialogComponent } from '../dialogs/shortestpath/shortestpath.dialog.component';
import { ShortestPathModel} from '../model/ShortestPathModel';


@Component({
  selector: 'app-interstella-transport',
  templateUrl: './interstella-transport.component.html',
  styleUrls: ['./interstella-transport.component.scss']
})
export class InterstellaTransportComponent implements OnInit {

  planets : PlanetModel[];
  displayedColumns: string[] = ['Name', 'VertexID', 'Actions'];
  dataSource : MatTableDataSource<PlanetModel>;

  constructor( private planetService: PlanetService, private planetModel:PlanetModel,
               public dialog: MatDialog, private toasterService: ToastrService, 
               private shortestPathModel : ShortestPathModel) { 

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    
    this.getAllPlanets();
  }

  getAllPlanets(){

    this.planetService.getPlanets().pipe(first()).subscribe(data =>{
    this.dataSource = new MatTableDataSource<PlanetModel>(data);
    this.dataSource.paginator = this.paginator;
    });
    }

    findShortestPath(name: string, vertexId: string){

      this.planetModel.name= name;
      this.planetModel.vertexId = vertexId;
      const dialogRef = this.dialog.open(ShortestPathDialogComponent, {
        data: {issue:this.shortestPathModel }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.planetService.dataChange.value.push(this.planetService.getDialogData());
          this.refreshTable();
        }
      });
    }

    refresh() {
      this.getAllPlanets();
    }

    addNew() {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        data: {issue:this.planetModel }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // After dialog is closed we're doing frontend updates
          // For add we're just pushing a new row inside PlanetService
          this.planetService.dataChange.value.push(this.planetService.getDialogData());
          this.refreshTable();
        }
      });
    }
  
    editPlanet(name: string, vertexId: string) {
      this.planetModel.name = name;
      this.planetModel.vertexId = vertexId
      // index row is used just for debugging proposes and can be removed
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: this.planetModel
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.planetService.dataChange.value.findIndex(x => x.vertexId === vertexId);
          // Then you update that record using data from dialogData (values you entered)
          this.planetService.dataChange.value[foundIndex] = this.planetService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
        }
      });
    }
  
    deletePlanet(name: string, vertexId: string) {
      this.planetModel.name = name;
      this.planetModel.vertexId = vertexId;
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: this.planetModel
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.planetService.dataChange.value.findIndex(x => x.vertexId === vertexId);
          // for delete we use splice in order to remove single object from Service
          this.planetService.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }
      });
    }
  
    private refreshTable() {
      // Refreshing table using paginator
      this.paginator._changePageSize(this.paginator.pageSize);
    }

}
