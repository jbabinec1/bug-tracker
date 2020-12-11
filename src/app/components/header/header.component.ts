import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '.././../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, public authService: AuthenticationService, public router: Router) { 

    

    this.loginUser = this.formbuilder.group({
      name: ['', Validators.required],
      password: '',
    });

  /*  this.authService.loginUser(this.loginUser).then(token => {
      console.log('userFName =', token);
    }); */

  }


  message:any;

  @Input() public res: any = [];
  public loginUser: any;
  userDisplayName = '';

  ngOnInit(): void {

    //this.userDisplayName = localStorage.getItem('name');
   
  }




  
  getName() {
  return localStorage.getItem('name');
  }



  logout() {
    this.authService.logout();
     window.location.reload();

  }

  

  login() {
    //this.authService.login2()  
    this.router.navigate(['/login']) .then(() => {
      window.location.reload();
      localStorage.clear();
    });
    
     
  }


  


}
