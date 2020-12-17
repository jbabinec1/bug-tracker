import { Injectable, Input } from '@angular/core';
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

  @Input() public res: any = [];


  getAccessToken() {
    return localStorage.getItem('access_token');
  }


   isLoggedIn():boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }





registerUser(username:Username): Observable<any> {  
 
  return this.http.post('/signup', username).pipe(
    catchError(this.handleError)
)

}




logout() {
  if (localStorage.removeItem('access_token') == null) {
    //this.router.navigate(['/list']);
    localStorage.clear(); 
    
 
    
  }
}

login2(){
  localStorage.removeItem('access_token')
}

logoutName() {
  localStorage.clear();   
  this.router.navigate(['/list']);
}


   


loginUser(username: Username){
  return this.http.post<any>('/login/', username)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
      localStorage.setItem('name', res.name)
      //localStorage.setItem('status', res.status)
      
    }) 
   
}  
   


/*
 loginUser(username: Username){

  return new Promise((resolve, reject) => {
   this.http.post<any>('http://localhost:3000/login/', username)
    .subscribe((res: any) => {
    let token =  localStorage.setItem('access_token', res.token)
    localStorage.setItem('name', res.name)

    resolve(token);
    
    })

  })


}  */






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