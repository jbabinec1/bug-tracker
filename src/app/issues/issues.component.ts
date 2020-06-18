import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugService } from './././../../../src/app/services/bug.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Bug } from '../Bug';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.sass']
})
export class IssuesComponent implements OnInit {

  bug: Bug[]

  displayedColumns = ['title', 'reporter', 'severity', 'status', 'actions'];

  constructor(private http: HttpClient, private bugService: BugService, private router: Router) { }

  @Input() public bugData: any = [];

  ngOnInit(): void {
  }

}
