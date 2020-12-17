import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '.././authentication.service';
import { Router } from '@angular/router';
import { Username } from '.././models/username';
import { Observable } from 'rxjs';
//import { error } from 'console';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;
  isSubmitted = false;

  @Output() messageEvent = new EventEmitter<string>();

  @Input() public res: any = [];
  public Use: any;
  userDisplayName: string;
  myName: any;
  error:any;
  errorStatus:any;

  constructor(private formbuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { 

   
    

    this.loginUser = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });



  }


  get formControls() {
    return this.loginUser.controls;
  }


  login() {

    this.isSubmitted = true;

    if(this.loginUser.invalid){
      return;
    }

    //if(this.authService.loginUser)

   

    this.authService.loginUser(this.loginUser.value)
    
    this.router.navigate(['/list']); 


      
  } 




  redirectTo(uri:string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
   this.router.navigate([uri]));
  }


  getName() {
   // return localStorage.getItem('name');
    this.userDisplayName = localStorage.getItem('name');
    return this.loginUser.controls['name'].setValue(this.userDisplayName); 
    }


    isName() {
     return localStorage.getItem('name') === null
    }

    isValid() {
   return this.authService.loginUser(this.loginUser.value) == null
      //return localStorage.getItem('status') == null;
     //isCorrect = true;
    }

  
isStatus() {
  return localStorage.getItem('status');
}





  ngOnInit(): void {

  
 // this.errorStatus = localStorage.getItem('status');
/*
    this.userDisplayName = localStorage.getItem('name');
    this.loginUser.controls['name'].setValue(this.userDisplayName);  */
  }

}
