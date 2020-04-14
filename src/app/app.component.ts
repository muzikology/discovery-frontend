import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interstella-front-end';



  constructor( private router: Router) {
   
}


interstellaPage(){
  this.router.navigate(['app-interstella-transport', 1]);
}

}

