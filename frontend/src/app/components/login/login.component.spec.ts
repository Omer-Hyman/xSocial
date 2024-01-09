import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { LocalStorageService } from 'src/app/services/LocalStorageService/local-storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let apiService: ApiService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    // const mockLocalStorageService = jasmine.createSpyObj(['setLoggedInUser', 'getCurrentUser']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: LocalStorageService, useValue: jasmine.createSpyObj('LocalStorageService', ['setLoggedInUser', 'getCurrentUser']) }
      ]
    }).compileComponents();
    
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  
  it('should create', () => {
    component.loginForm.markAllAsTouched();
    
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['username'].value).toEqual('');
    expect(component.loginForm.controls['password']).toBeDefined();
    expect(component.loginForm.controls['password'].value).toEqual('');
    expect(component.loginForm.valid).toBeFalse();
    
    expect(component).toBeTruthy();
  });
  
  describe('login', () => {
    it('login form is valid and login details are valid', async () => {
      spyOnProperty(component.loginForm, 'valid').and.returnValue(true);
      const apiServiceSpy = spyOn(apiService, 'login').and.callThrough();
      const routerSpy = spyOn(router, 'navigate');
      apiServiceSpy.and.resolveTo(true);

      await component.login();

      expect(component.invalidLogin).toBeFalse();
      expect(apiServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });

    it('login form is valid and login details are invalid', async () => {
      spyOnProperty(component.loginForm, 'valid').and.returnValue(true);
      const apiServiceSpy = spyOn(apiService, 'login').and.callThrough();
      apiServiceSpy.and.resolveTo(false);

      await component.login();

      expect(component.invalidLogin).toBeTrue();
      expect(apiServiceSpy).toHaveBeenCalled();
    });

    it('login form is invalid', async () => {
      spyOnProperty(component.loginForm, 'valid').and.returnValue(false);
      const spy = spyOn(component.loginForm, 'markAllAsTouched');

      await component.login();

      expect(component.invalidLogin).toBeTrue();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('new user created and logged in', async () => {
      component.loginForm.setValue({
        username: 'newUsername',
        password: 'patchingThisForm123'
      });
      const createNewUserSpy = spyOn(apiService, 'createNewUser').and.callThrough();
      const loginSpy = spyOn(apiService, 'login').and.callThrough();
      createNewUserSpy.and.resolveTo(['ok']);
      loginSpy.and.resolveTo(true);
      const routerSpy = spyOn(router, 'navigate');

      await component.register();

      expect(createNewUserSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });

    it('new user created but failed to logged in', async () => {
      component.loginForm.setValue({
        username: 'newUsername',
        password: 'patchingThisForm123'
      });
      const createNewUserSpy = spyOn(apiService, 'createNewUser').and.callThrough();
      const loginSpy = spyOn(apiService, 'login').and.callThrough();
      createNewUserSpy.and.resolveTo(['ok']);
      loginSpy.and.resolveTo(false);
      const routerSpy = spyOn(router, 'navigate');

      await component.register();

      expect(createNewUserSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(routerSpy).not.toHaveBeenCalled();
    });

    it('login form invalid', async () => {
      spyOnProperty(component.loginForm, 'valid').and.returnValue(false);
      const spy = spyOn(component.loginForm, 'markAllAsTouched');

      await component.register();

      expect(spy).toHaveBeenCalled();
    });
  });
});
