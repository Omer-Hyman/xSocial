import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpotViewComponent } from './spot-view.component';
import { Spot } from '../../interfaces';
import { ApiService } from 'src/app/services/api.service';

describe('SpotViewComponent', () => {
  let component: SpotViewComponent;
  let fixture: ComponentFixture<SpotViewComponent>;
  let mockApiService;

  beforeEach(waitForAsync(() => {
    
    mockApiService = jasmine.createSpyObj(['getUsers']);
    mockApiService.getUsers.and.returnValue(undefined);

    TestBed.configureTestingModule({
      declarations: [ SpotViewComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
         {provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(SpotViewComponent);
    component = fixture.componentInstance;
    const spot: Spot = {
      name: 'spot',
      latitude: 123,
      longitude: 456,
      suitableFor: ['skateboard'],
      image: ''
    }
    component.spot = spot;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
