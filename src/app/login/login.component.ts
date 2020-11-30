import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '.././authentication.service';
import { Router } from '@angular/router';
import { Username } from '.././models/username';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;

  constructor(private formbuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { 

    this.loginUser = this.formbuilder.group({
      name: ['', Validators.required],
      password: '',
    });

  }


  login() {
    this.authService.loginUser(this.loginUser.value) 
      this.router.navigate(['/list']);
      console.log('User logged in!');
  } 


  
 /* login() {
    this.authService.loginUser(this.loginUser.value).subscribe((user: Username) => {
      //this.router.navigate(['/list']);
      console.log('User logged in!');
      
      
    });
  } */





  ngOnInit(): void {
  }

}
