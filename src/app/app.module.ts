import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PlanetModel } from './model/PlanetModel';
import { PlanetService } from './services/PlanetService';
import { InterstellaTransportComponent } from './interstella-transport/interstella-transport.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import { ShortestPathDialogComponent} from './dialogs/shortestpath/shortestpath.dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { ShortestPathModel} from './model/ShortestPathModel';

@NgModule({
  declarations: [
    AppComponent,
    InterstellaTransportComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ShortestPathDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ShortestPathDialogComponent
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [PlanetModel, PlanetService, ShortestPathModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
