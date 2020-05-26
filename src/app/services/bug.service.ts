import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import Bug from '/Users/jaredbabinec/Documents/bug-test/bug-test/bug.js';





@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }


  url = 'http://localhost:3000';
  testUrl = `/bug`;


 /* createBug(): Observable<any> { 
  let getHeaders = new HttpHeaders({'CONTENT-TYPE': 'application/json'}); 
  return this.http.post('http://127.0.0.1:3000/bug', JSON.parse(JSON.stringify(this.postData)), { headers: getHeaders}); 

} */


getBugs(): Observable<Bug> {
let getHeaders = new HttpHeaders({'CONTENT-TYPE': 'application/json'}); 
return this.http.get('http://localhost:3000/bugs/'); 
}


getBugById(id) {
  return this.http.get(`http://localhost:3000/bugs/${id}`);
}



addBug(title, reporter, description, severity, status) {
  const bug = {
    title: title,
    reporter: reporter,
    description: description,
    severity: severity,
    status: status
  };
  return this.http.post('http://localhost:3000/bugs/add', bug);
}


deleteBug(id) {
  return this.http.get(`${this.url}/bugs/delete/${id}`);
}






}
