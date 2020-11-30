import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { registerLocaleData } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Username} from './models/username';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient,public router: Router, private http: HttpClient) { }


  getAccessToken() {
    return localStorage.getItem('access_token');
  }


   isLoggedIn():boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }




registerUser(username:Username): Observable<any> {  
 /* const user = {
    name: name,
    password: password,
    platform: platform,
  };*/

  return this.http.post('http://localhost:3000/signup', username).pipe(
    catchError(this.handleError)
)

}

/*
loginUser(username:Username): Observable<any> {  
 
   return this.httpClient.post<any>('http://localhost:3000/login/', username)

} */


logout() {
  if (localStorage.removeItem('access_token') == null) {
    this.router.navigate(['/list']);
  }
}
   
   



 loginUser(username: Username) {
  return this.http.post<any>('http://localhost:3000/login/', username)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
    /*  this.getUserProfile(res._id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['users/profile/' + res.msg._id]);
      }) */
    })
}  






handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}






}