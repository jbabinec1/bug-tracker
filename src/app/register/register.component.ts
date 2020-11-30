import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '.././authentication.service';
import { Router } from '@angular/router';
import { Username } from '.././models/username';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;

  constructor(private formbuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {

    this.registerUser = this.formbuilder.group({
      name: ['', Validators.required],
      password: '',
      platform: ''
    });

   }

   addUser() {
    this.authService.registerUser(this.registerUser.value).subscribe((user: Username) => {
      //this.router.navigate(['/list']);
      console.log('User added!');
      
      
    });
  }




  ngOnInit(): void {
  }

}
