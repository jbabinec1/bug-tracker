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



  

registerUser(username: Username): Observable<any> {

  return this.http.post('/signup/', username).pipe(
    catchError(this.handleError)
)

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