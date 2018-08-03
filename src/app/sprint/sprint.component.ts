import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiBackEndService } from '../services/api-backend.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  
  constructor(private auth: AuthService, 
    private apiService: ApiBackEndService,
    private modalService: NgbModal
   
    ) { }
  //list sprint
   sprints;

  //user name
  userName;
  userID;
  
  filterValue;
  tableSprintFiltered;
  isFiltered = false
  ngOnInit() {

     /**
       * get user info
       */
      this.getName();
      this.getIdUser();

      /**
       * get sprint Array.
       */
      this.getSprints();

     
  }

  /**
   * get all sptint.
   */
  getSprints() {
    this.apiService.getSprints(this.userID).subscribe(data => (
      this.sprints =  data
    ));
  }

  /**
   * get user Name.
   */
   getName(){
    this.userName =  this.auth.getName();
  }

  /**
   * get user ID.
   */
  private getIdUser(){
    this.userID = this.auth.getID();
  }

  /**
   * open warning modal
   * @param content modal passed by html
   */
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * when user want to delete data associated to his account.
   */
  delete(){
    this.apiService.deleteAll(this.userID).subscribe(data => (
      this.ngOnInit()
    ));
  }
  /**
   * fliter past sprint
   */
  filter(){
    this.tableSprintFiltered = [];

    let keywords = this.filterValue.toLowerCase()
    this.isFiltered = true;
    for (let i = 0; i < this.sprints.length; i++) {
      if(this.sprints[i].length.toLowerCase().includes(keywords)){
        this.tableSprintFiltered.push(this.sprints[i]);
      }
    }
  }

  /**
   * sort past-sprint 
   */
   sortBy(name){
    this.apiService.sort(name,this.userID).subscribe(data => (
     this.sprints = data.data
    ));
   }
 
  
}
