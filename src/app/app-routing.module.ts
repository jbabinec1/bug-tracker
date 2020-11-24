import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import {BugDetailsComponent} from '../././../src/app/bug-details/bug-details.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  //{ path: 'bug', component: AppComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'details/:id', component: BugDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  {  path: '**', redirectTo: 'list'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
