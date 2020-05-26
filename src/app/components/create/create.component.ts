import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '/Users/jaredbabinec/Documents/bug-test/bug-test/src/app/services/bug.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private bugService: BugService, private fb: FormBuilder, private router: Router) { 

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      reporter: '',
      description: '',
      severity: '',
      status: ''
    });

  }



  addBug(title, reporter, description, severity, status) {
    this.bugService.addBug(title, reporter, description, severity, status).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }



  ngOnInit(): void {
  }

}
