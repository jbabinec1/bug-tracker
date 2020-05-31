import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Bug  } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/Bug';
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

  displayedColumns = ['title', 'type', 'status', 'reporter', 'actions'];
  

  constructor(private http: HttpClient, private bugService: BugService, private router: Router) { }

  @Input() public bugData: any = [];
  
   
  ngOnInit(): void {

    this.fetchBugs();
 
  }



  fetchBugs() {
    this.bugService.getBugs().subscribe((bugs: Bug[]) => {
    this.bugData = new MatTableDataSource(bugs);
      console.log(bugs);   
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
