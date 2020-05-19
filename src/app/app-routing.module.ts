import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/app.component';

const routes: Routes = [

  { path: 'bug', component: AppComponent },
  
  {  path: '**', redirectTo: 'bug'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
