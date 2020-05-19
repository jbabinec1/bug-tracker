import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }

  postData = {
    first: 'Bug works',
    last: 'Sonion lololol'
  }

  url = `http://httpbin.org/post`;
  testUrl = `/bug`;


  createBug(): Observable<any> { 
 //return this.http.post(this.url, this.postData) 

  let getHeaders = new HttpHeaders({'CONTENT-TYPE': 'application/json'}); 

  return this.http.post('http://127.0.0.1:3000/bug', JSON.parse(JSON.stringify(this.postData)), { headers: getHeaders}); 

}



}
