import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Bug  } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/Bug';
import { Comment } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/comment';
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
  comment: Comment[];

  displayedColumns = ['title', 'description', 'reporter', 'type', 'status'];

  id: String;
  reporter: String;
  description: String;

  time = new Date().toString();
  newComment = [];

  createComment: FormGroup;
  
  
  

  updateForm: FormGroup;

  constructor(private http: HttpClient, private bugService: BugService, private router: Router,  private route: ActivatedRoute, private fb: FormBuilder) {


    this.createComment = this.fb.group({

      reporter: '',
      description: '',
      
    });


   }

  @Input() public bugData: any = [];

  bugz: any = {};
  //comment: Comment[];
  @Input() public commentData: any = [];
  


  
  
  
  
  

  ngOnInit(): void {

  
  this.route.params.subscribe(params => {
    this.id = params.id;
    this.fetchBug(this.id);   
    this.fetchComments();
    
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


fetchComments(){
  this.bugService.getComments().subscribe((comment: Comment[]) => {
    this.commentData = comment; 
    console.log(comment);
  })
}

//Write function for getting just one comment by id.. 
fetchComment(id){
  //
}




  addComment(reporter, description) {
    this.bugService.addComment(reporter, description).subscribe((comment: Comment[]) => {
      this.router.navigate([`details/${this.id}`]);
      this.commentData = comment;
       console.log(comment);
    });
  }


  //test add comment

  postComment(id){

  }






}
