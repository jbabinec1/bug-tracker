import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../.././../../src/app/services/bug.service';
import { Bug  } from '../../../app/bug';
import { AuthenticationService } from '../../authentication.service';
import { Username } from '../../models/username';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  time = new Date().toString();
  bug: Bug[];
  //username: Username; 
  @Input() public username: Username;

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  constructor(private bugService: BugService, private fb: FormBuilder, private router: Router, public authService: AuthenticationService) { 

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      reporter: '',
      description: '',
      type: '',
      status: ''
    });
    

  }



  addBug(title, reporter, description, type, status) {
    this.bugService.addBug(title, reporter, description, type, status).subscribe((bug: Bug[]) => {
      this.router.navigate(['/list']);
      
      
    });
  }



  ngOnInit(): void { 
  const currentDate = new Date().toISOString().substring(0, 10);
  this.createForm.controls['status'].setValue(currentDate);
  
  
  }

}
