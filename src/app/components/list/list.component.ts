import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '../.././../../src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Bug } from '../.././Bug';
import { Comment } from '../.././comment';
import { RouterModule } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  bug: Bug[]
  comment: Comment[];

  displayedColumns = ['title', 'type', 'status', 'reporter', 'actions'];
  

  constructor(private http: HttpClient, private bugService: BugService, private router: Router) { }

  @Input() public bugData: any = [];
  @Input() public commentData: any = [];

  id;
  reporter;
  description;
  
   
  ngOnInit(): void {

    this.fetchBugs();
    //this.fetchComment(this.id, this.reporter, this.description);
 
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
