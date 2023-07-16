import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../interfaces';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'component'
  }
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerMode = false;
  public invalidLogin = false;
  public registerErrorMessages?: string[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storage: LocalStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.storage.setLoggedInUser();
  }

  // The token should be sent in http requests to the server to authenticate requests, so the server knows who's requesting the data 
  // TODO: Fix error messages on register form???

  public async login(): Promise<void> {
    this.invalidLogin = false;
    if (this.loginForm.valid) {
      const result = await this.apiService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
      result ? this.router.navigate(['/map', this.storage.getCurrentUser()?.id]) : this.invalidLogin = true;
    } else {
      this.invalidLogin = true;
      this.loginForm.markAllAsTouched();
    }
  }

  // TODO: put all services into their own folder I guess

  public async register(): Promise<void> {
    this.registerErrorMessages = [];
    console.log("Registering new user with details: ");
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const newUser: User = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      const registerResult = await this.apiService.createNewUser(newUser);
      if (registerResult[0] === 'ok') {
        const loginResult = await this.apiService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
        if (loginResult) {
          this.router.navigate(['/map', this.storage.getCurrentUser()?.id]);
        } else {
          console.log('log in after register failed!!!');
        }
      } else {
        console.log(registerResult);
        for (const error of registerResult) {
          this.registerErrorMessages?.push(error);
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.registerErrorMessages?.push('Please fill out the login form!');
    }
  }
}

// TODO: sort out guest!!!
