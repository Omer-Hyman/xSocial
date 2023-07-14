import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let service: LocalStorageService;

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
    
    service = TestBed.inject(LocalStorageService);

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
  
  describe('ngOnInit', () => {
    it('should reset logged in user', () => {
      // spyOn(mockLocalStorageService, 'setLoggedInUser').and.returnValue();
      // fixture.detectChanges();
      // mockLocalStorageService.setLoggedInUser.and.resolveTo();
      
      // component.ngOnInit();

      // expect(mockLocalStorageService.setLoggedInUser()).toHaveBeenCalled();
    });
  });
});
