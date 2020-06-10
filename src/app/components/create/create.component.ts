import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/services/bug.service';
import { Bug  } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/Bug';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  time = new Date().toString();
  bug: Bug[];

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  constructor(private bugService: BugService, private fb: FormBuilder, private router: Router) { 

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
