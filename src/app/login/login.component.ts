import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '.././authentication.service';
import { Router } from '@angular/router';
import { Username } from '.././models/username';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;

  @Output() messageEvent = new EventEmitter<string>();

  @Input() public res: any = [];
  public Use: any;

  constructor(private formbuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { 

   

    this.loginUser = this.formbuilder.group({
      name: ['', Validators.required],
      password: '',
    });

  }


  login() {
    this.authService.loginUser(this.loginUser.value)
    //this.redirectTo('/list') 
   
      this.router.navigate(['/list']);
       
     /*.then(() => {
     window.location.reload();
     }) 
      console.log('User logged in!'); */
      
  } 


  redirectTo(uri:string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
   this.router.navigate([uri]));
  }




  






  ngOnInit(): void {
  }

}
