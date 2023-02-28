import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerMode = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      displayName: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("login page instantiated!");
    console.log("register mode = " + this.registerMode);
   }
  
  submitForm() { 
    console.log("Submitted with details: ");
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.router.navigate(['/map'])
    } else {
      this.loginForm.markAllAsTouched();
      console.log("Login form is invalid!");
    }
  }
}
