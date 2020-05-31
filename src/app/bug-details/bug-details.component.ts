import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Bug  } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/Bug';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit {

  bug: Bug[]

  displayedColumns = ['title', 'description', 'reporter', 'type', 'status'];

  id: String;
  

  updateForm: FormGroup;

  constructor(private http: HttpClient, private bugService: BugService, private router: Router,  private route: ActivatedRoute, private fb: FormBuilder) { }

  @Input() public bugData: any = [];

  bugz: any = {};

  

  
  
  

  ngOnInit(): void {

  
  this.route.params.subscribe(params => {
    this.id = params.id;
    this.fetchBug(this.id);   
  })  
  }



  fetchBugs() {
    this.bugService.getBugs().subscribe((bugs: Bug[]) => {
      this.bugData = bugs;
      console.log(bugs);
     
      }) 
  }  


  fetchBug(id) {
    this.bugService.getBugById(id).subscribe((bugs: Bug[]) => {
      this.bugData = bugs;
      console.log(bugs);
      //this.bugData.push(this.bugz);
      })    
  }







}
