import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from './services/bug.service';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bug-test';
 json;
  constructor(private http: HttpClient, private bugService: BugService){

 /*   this.http.post(this.url, this.postData).toPromise().then((data:any) => {
      console.log(data.json.test);
      this.json = JSON.stringify(data.json);
    }) */

  }

  ngOnInit() {

  this.bugService.createBug().subscribe(bug => {

  this.postData = bug;

  })

  }


  postData = {
    first: 'Bug',
    last: 'Sonion lololol'
  }

  





}


