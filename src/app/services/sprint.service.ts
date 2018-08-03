import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPRINTS } from './toutLesSprints';
import { TailleSprint } from './TailleSprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }
 
  //get all sprint
  getSprints(): Observable<TailleSprint[]> {
    return of(SPRINTS);
  }
  
}
