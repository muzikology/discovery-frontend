import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Request, Response, NextFunction } from 'express';
import { PlanetModel } from '../model/PlanetModel';
import {BehaviorSubject} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ShortestPathModel } from '../model/ShortestPathModel';


export type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

@Injectable({ providedIn: 'root' })
export class PlanetService {

    dataChange: BehaviorSubject<PlanetModel[]> = new BehaviorSubject<PlanetModel[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;

     shortestPath : ShortestPathModel;
    
      
  
    constructor(private http: HttpClient, private toasterService: ToastrService ) { 
    }

    getPlanets(){
        
        return this.http.get<any[]>(`${environment.apiUrl}/vertices`);
    }

    findShortestPath(shortestPathModel: ShortestPathModel){
      // return this.http.post(`${environment.apiUrl}/shortest`, shortestPathModel, {responseType:'text'});
      return  this.http.post(`${environment.apiUrl}/shortest`, shortestPathModel, {responseType:'text'}).subscribe(data => {
        console.log(data);
        this.dialogData = shortestPathModel;
       this.toasterService.success('The Shortest Path is: ' + data);
        },
       (err: HttpErrorResponse) => {
        console.log(err.statusText);
       this.toasterService.error('Error occurred. Details: ' + err.statusText + ' ' + err.message);
      });
    }

    get data(): PlanetModel[] {
        return this.dataChange.value;
      }
    
      getDialogData() {
        return this.dialogData;
      }

      // ADD, POST METHOD
      addPlanet(planetModel: PlanetModel): void {
        this.http.post(`${environment.apiUrl}/vertices`, planetModel).subscribe(data => {
          this.dialogData = planetModel;
           this.toasterService.success(planetModel.name + 'Planet Successfully added');
          },
          (err: HttpErrorResponse) => {
           this.toasterService.error('Error occurred. Details: ' + err.name + ' ' + err.message);
        });
       }
    
    // UPDATE, PUT METHOD
        updatePlanet(planetModel: PlanetModel): void {
        console.log(planetModel);
        this.http.put(`${environment.apiUrl}/vertices`, planetModel).subscribe(data => {
        this.dialogData = planetModel;
         this.toasterService.success(planetModel.name + 'Successfully edited');
        },
        (err: HttpErrorResponse) => {
         this.toasterService.error('Error occurred. Details: ' + err.name + ' ' + err.message);
        }
    );
    }
    
      // DELETE METHOD
      deletePlanet(planetModel: PlanetModel): void {
        this.http.delete(`${environment.apiUrl}/vertices/`+ planetModel.vertexId).subscribe(data => {
             this.toasterService.success(planetModel.name + 'Successfully deleted');
          },
          (err: HttpErrorResponse) => {
            this.toasterService.error('Error occurred. Details: ' + err.name + ' ' + err.message);
          }
        );
      }

}
