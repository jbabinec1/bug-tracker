import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';









@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }


  url = 'http://localhost:3000';
  testUrl = `/bug`;

  id;

//http://localhost:3000/bugs/
getBugs(): Observable<any> {
let getHeaders = new HttpHeaders({'CONTENT-TYPE': 'application/json'}); 
return this.http.get('/bugs/');    // http://localhost:3000/bugs/
} 

getComments(): Observable<any> {
  let getHeaders = new HttpHeaders({'CONTENT-TYPE': 'application/json'}); 
  return this.http.get('/comments/'); //* http://localhost:3000/comments/
}


getBugById(id) {
  return this.http.get(`/bugs/${id}`); //* http://localhost:3000/bugs/${id}  && /bugs/${id}
}

getCommentById(id){
  return this.http.get(`/comments/${id}`); //* http://localhost:3000/comments/${id}
}



addBug(title, reporter, description, type, status) {
  const bug = {
    title: title,
    reporter: reporter,
    description: description,
    type: type,
    status: status
  };
  return this.http.post('/bugs/add', bug);   //  'http://localhost:3000/bugs/add'    //'/bugs/add'
}


 addComment(reporter, description) {
  const comment = {
    
    reporter: reporter,
    description: description,
  };
  return this.http.post(`/comments/add`, comment);  //  /comments/add
} 



// Test post comment... From the youtube

postComment(id, comment, commenter) {

const commentData = {
  id: id,
  comment: comment,
  commenter: commenter
}
return this.http.post(`/comment`, commentData);  // http://localhost:3000/comment && /comment
} 





deleteBug(id) {
  return this.http.get(`/bugs/delete/${id}`);
}






}
