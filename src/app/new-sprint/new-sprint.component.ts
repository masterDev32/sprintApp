import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TailleSprint } from '../services/TailleSprint'
import { SprintService } from '../services/sprint.service';
import { ApiBackEndService } from '../services/api-backend.service';
import { PushNotificationService } from '../services/push-notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Sprint } from '../services/sprint';
import { Router } from '@angular/router';
@Component({
  selector: 'new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
 
  /**
   * stock sprint array
   */
  sprints:  TailleSprint[];
  
  /**
   * stock info about sprint to save.
   */
  sprintInfo: Sprint

  /**
   * description: sprint description
   * sprintDuree: sprint name and Time
   * notification: if user want to be notify
   * startAt: time sprint started
   * finishAt: time sprint finished
   * status: completed or cancelled.
   */
  description: string;
  sprintDuree: string;
  notification: boolean;
  startAt: Date;
  finishAt: Date
  status: string;

  /**
   * time: stock sprint time in milliseconds
   */
  time;

  isProgress = false;
  pourcentage: Number = 0;
  stopProgress = false;
  
  userName;

  constructor(private auth: AuthService, private sprintService: SprintService,private apiService: ApiBackEndService, private notificationService: PushNotificationService,
    private modalService: NgbModal, private router: Router
  ) { 
      this.notificationService.requestPermission();
  }

  ngOnInit() {
     /**
      * get All past sprint
      */
     this.getSprints();
     
     /**
      * get user information
      */
     this.getName();
  }

  getSprints(): void{
    this.sprintService.getSprints().subscribe(sprint => this.sprints = sprint);
  }

  add(): void {

      /**
       * change view to display progress view
       */
      this.isProgress = true;

      /**
       * set sprint time in milliseconds
       */
      switch(this.sprintDuree){
        case 'Instant': 
                        this.time = 5000;
                        this.sprintDuree = 'Instant ( 5s )';
                        this.sprintEvolution();
                         break;
        case 'Very Short':
                           this.time = 300000
                           this.sprintDuree = 'Very Short ( 5min )';
                           this.sprintEvolution();
                           break;
        case 'Short': 
                            this.time = 900000;
                            this.sprintDuree = 'Short ( 15min )';
                            this.sprintEvolution();
                            break;
        case 'Promodoro': 
                          this.time = 1500000;
                          this.sprintDuree = 'Promodoro ( 25min )';
                          this.sprintEvolution();
                          break;
        case 'Long': 
                        this.time = 2700000;
                        this.sprintDuree = 'Long ( 45min )';
                        this.sprintEvolution();
                        break;
        case 'Very Long':
                          this.time = 3600000;
                          this.sprintDuree = 'Very Long ( 60min )';
                          this.sprintEvolution();
                          break;
      }
  }

  /**
   * func show sprint evolution
   */
   sprintEvolution(){
     var totalTemps = this.time; 
     var now = new Date().getTime();
     this.startAt = new Date();
     var interval = window.setInterval(()=> {
      if(!this.stopProgress){
            var diff = Math.round(new Date().getTime() - now),
                  val = Math.round(diff / totalTemps * 100);
                  val = val > 100 ? 100 : val;
                  this.pourcentage = Number.parseFloat(""+val);
                  if (diff >= totalTemps) {
                    clearInterval(interval);
                    //show notification.
                    this.notifyWhenCompleted();
                    //save on DB.
                    this.sprintState();
                    this.saveOnDB();
              }
        }
      }, 100);
   
  }

    /**
     * func push notification
     */
    notifyWhenCompleted(){
      if (this.notification) {
        const data: Array<any> = [];
        data.push({
          title: 'Sprint',
          alertContent: 'Your Sprint is finish'
        });
        this.notificationService.generateNotification(data);
      }

    }

    /**
     * open modal
     * @param content modal passed by html
     */
    openVerticallyCentered(content) {
      this.stopProgress = true;
      this.modalService.open(content, { centered: true });
    }
    /**
     * open modal
     * @param content modal passed by html
     */
    openVerticallyCenteredDone(content) {
      this.modalService.open(content, { centered: true });
    }

    /**
     * close modal and return to progress
     */
    returnToProgress(){
      this.stopProgress = false;
    }

    /**
     * close modal and save data
     */
    stopProgressAndSaveData(){
        this.sprintState();
        this.apiService.saveSprint(this.sprintInfo).subscribe(data =>  { 
          this.ngOnInit();
          this.router.navigate(['/sprint']);  
        }) 
    }

    /**
     * func called when sprint is finished
     */
    sprintState(){
      this.finishAt = new Date();
      if(this.pourcentage >= 100){
        this.status = 'Completed';
      }else{
        this.status = 'Cancelled (at ' + this.pourcentage + '%)';
      }
        this.sprintInfo = {
        idUser: this.auth.getID(),
        date: this.startAt,
        description : this.description,
        length : this.sprintDuree,
        status : this.status,
        start : this.startAt,
        finish : this.finishAt
      };
    }
    
    /**
     * func to save data in DB.
     */
    saveOnDB(){
      this.apiService.saveSprint(this.sprintInfo).subscribe(data =>  { 
        this.ngOnInit();
        this.finished();
     }) 
    }

      /**
      * show finish modal
      */
     finished(){
      var btn = document.getElementsByTagName('button');
      btn[0].click();
     }
     /**
      * when usser clicked on close in modal who show sprint detail
      */
     sprintSuccess(){
      this.router.navigate(['/sprint']);
      
     }

    /**
     * get user name
     */
     getName(){
      this.userName =  this.auth.getName();
    }
    }
