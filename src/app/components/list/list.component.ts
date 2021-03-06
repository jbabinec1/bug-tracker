import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '../.././../../src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Bug  } from '../../../app/bug';
import { Comment  } from '../../../app/comment';
import { RouterModule } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { AuthenticationService } from '.././../authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  bug: Bug[]
  comment: Comment[];
  loginUser: any;
  displayedColumns = ['title', 'type', 'status', 'reporter'];
  

  constructor(private http: HttpClient, private bugService: BugService, private router: Router, public authService:AuthenticationService) {

   


  }
   

  @Input() public bugData: any = [];
  @Input() public commentData: any = [];
  //@Input() public res: any = [];

  id;
  reporter;
  description;
  
   
  ngOnInit(): void {

    this.fetchBugs();
    //this.fetchComment(this.id, this.reporter, this.description);

   /* if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') == 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    } */


    
 
  }


  logout() {
    this.authService.logout();
    window.location.reload();
  }



  fetchBugs() {
    this.bugService.getBugs().subscribe((bugs: Bug[]) => {
    this.bugData = new MatTableDataSource(bugs);
      console.log(bugs);   
      }) 
  } 


  fetchComment(reporter, description) {
    this.bugService.addComment(reporter, description).subscribe((comment: Comment[]) => {
    this.commentData = comment;
      console.log(comment);   
      }) 
  }


  editBug(id) {
    this.router.navigate([`/edit/${id}`]);
  }

// Only keeping this for testing
  deleteIssue(id) {
    this.bugService.deleteBug(id).subscribe(() => {
      this.fetchBugs();
    });
  } 

//Prob need to delete this function 
  detailsBug(id) {
    this.router.navigate([`details/${id}`]);   // Need to create details component
  }



  applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.bugData.filter = filterValue;     
  }


  



} // End List Class
