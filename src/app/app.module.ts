import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { SprintComponent } from './components/sprint/sprint.component';
import { NewSprintComponent } from './components/new-sprint/new-sprint.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiBackEndService } from './services/api-backend.service';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SprintComponent,
    NewSprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    DataTableModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    AuthService,
    ApiBackEndService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
