import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '.././../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  @Input() public res: any = [];

  ngOnInit(): void {

   /* this.authService.loginUser.then(
      (res: any) => {
      }  */
    
  }



  logout() {
    this.authService.logout();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login']);
  }

}
