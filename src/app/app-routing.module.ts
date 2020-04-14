import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterstellaTransportComponent } from './interstella-transport/interstella-transport.component';


// import { Test1Component } from './insterstella-test/test1/test1.component';
// import { Test2Component } from './insterstella-test/test2';
// import { Test3Component } from './insterstella-testt/test3';
// import { Test4Component } from './insterstella-test/test4';




const routes: Routes =  [
  { path: '', component: InterstellaTransportComponent },
  // { path: 'test1', component: Test1Component},
  // { path: 'test2', component: Test2Component},
  // { path: 'test3', component: Test3Component},
  // { path: 'test4', component: Test4Component},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
