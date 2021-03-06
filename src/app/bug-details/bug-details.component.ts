import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from '.././../../src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Bug  } from '../../app/bug';
import { Comment } from '../../app/comment';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit {

  bug: Bug[]
  //comment: Comment[];

  displayedColumns = ['title', 'description', 'reporter', 'type', 'status'];

  id: String;
  reporter: String;
  description: String;

  time = new Date().toString();
  newComment = [];

  //createComment: FormGroup;

  commentForm: FormGroup;
  userDisplayName: string;
  
  
  

  constructor(private http: HttpClient, private bugService: BugService, private router: Router,  private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthenticationService) {


   //this.createCommentForm();

   this.commentForm = this.fb.group({
    comment: '',
    commenter: '',
  })


   }

  @Input() public bugData: any = [];

  bugz: any = {};
  //comment: Comment[];
  @Input() public commentData: any = [];
  


  canComment(){
    if(this.authService.isLoggedIn() !== true) {
      window.alert("Please log in!")
      this.router.navigate(['/login'])
    }

  }
  
  
  
  

  ngOnInit(): void {

  
  this.route.params.subscribe(params => {
    this.id = params.id;
    this.fetchBug(this.id);   
    //this.fetchComments();
    
  })  

  this.userDisplayName = localStorage.getItem('name');
  this.commentForm.controls['commenter'].setValue(this.userDisplayName);



  }

// Fetch all bugs

  fetchBugs() {
    this.bugService.getBugs().subscribe((bugs: Bug[]) => {
      this.bugData = bugs;
      console.log(bugs);
     
      }) 
  }  

  //Fetch specific bug by ID 

  fetchBug(id) {
    this.bugService.getBugById(id).subscribe((bugs: Bug[]) => {
      this.bugData = bugs;
      console.log(bugs);
      //this.bugData.push(this.bugz);
      })    
  }


//Fetch all comments
fetchComments(){
  this.bugService.getComments().subscribe((comment: Comment[]) => {
    this.commentData = comment; 
    console.log(comment);
  })
}



/*

  addComment(reporter, description) {
    this.bugService.addComment(reporter, description).subscribe((comment: Comment[]) => {
      this.router.navigate([`details/${this.id}`]);
      this.commentData = comment;
       console.log(comment);
    });
  } */




  //test add comment .. from the youtube

  postComment(id) {

    let comment = this.commentForm.get('comment').value; 
    let commenter = this.commentForm.get('commenter').value; 
    if(this.authService.isLoggedIn() == true) {
    this.bugService.postComment(id, comment, commenter).subscribe(data => {
      this.fetchBug(id);
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
    })

  } else {
    window.alert("Please log in!")
  }

  }


/*
  draftComment(id){
    this.newComment = [];
    this.newComment.push(id);
  } --> */



  createCommentForm(){
    this.commentForm = this.fb.group({
      comment: '',
      commenter: '',
    })
  }






}
