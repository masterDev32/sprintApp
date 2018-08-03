
import { Injectable } from '@angular/core';
import { Http,  Response } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ApiBackEndService {
  constructor(private http: Http) {}
  url = 'http://localhost:3000/api'
  /**
   * get All sprint.
   */
    getSprints(userID){
      return (
         this.http
        .get(`${this.url}/getSprints/${userID}`)
        .pipe(
          map((response: Response) => response.json())
        )
      ) 
    }
   
  /**
   * save sprint
   * @param sprintInfo sprint information.  
   */
  saveSprint(sprintInfo){      
    return this.http.post(`${this.url}/saveSprint`, sprintInfo)  
            .pipe(
              map((response: Response) =>response.json())  
            );            
  }

  /**
   * delete data for this user.
   * @param userID id of user
   */
  deleteAll(userID){
    return this.http.delete(`${this.url}/deleteSprint/${userID}`)  
    .pipe(
      map((response: Response) =>response.json())  
    );   
  }

  /**
   * sort
   */
  sort(name,userID){
    return this.http.get(`${this.url}/sort/${name}/${userID}`)  
    .pipe(
      map((response: Response) =>response.json())  
    ); 
  }

}


