import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SprintComponent } from './sprint/sprint.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import {AuthGuard } from './services/auth.guard'
/**
 * create path and show component relative to this path.
 */
const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'sprint', component: SprintComponent, canActivate: [AuthGuard]},
  {path: 'newSprint', component: NewSprintComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {}