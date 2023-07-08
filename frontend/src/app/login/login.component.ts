import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoggedInUser, User } from '../interfaces';


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'component'
  }
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerMode = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      displayName: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
  }

  public async login(): Promise<void> {
    console.log("Logging in with details: ");
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const result = await this.apiService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
      if (result) {
        this.setLoggedInUser(result);
        this.router.navigate(['/map']);
        // pass userID around in route params? and then get user data from that
      }
    } else {
      this.loginForm.markAllAsTouched();
      console.log("Login form is invalid!");
    }
  }

  private setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
   }

  //  TODO: DO NPM INSTALLS!!!

  public async register(): Promise<void> {
    console.log("Registering new user with details: ");
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const newUser: User = {
        username: this.registerForm.get('username')?.value,
        // displayName: this.registerForm.get('displayName')?.value,
        password: this.registerForm.get('password')?.value
      }
      const result = await this.apiService.createNewUser(newUser);
      if (result === 201) {
        this.router.navigate(['/map']);
      }
    } else {
      this.registerForm.markAllAsTouched();
      console.log("Register form is invalid!");
    }
  }
}
