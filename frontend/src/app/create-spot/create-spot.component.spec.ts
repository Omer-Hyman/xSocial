import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CreateSpotComponent } from './create-spot.component';
import { ActivatedRoute } from '@angular/router';
// import { } from 'googlemaps';


describe('CreateSpotComponent', () => {
  let component: CreateSpotComponent;
  let fixture: ComponentFixture<CreateSpotComponent>;
  let mockActivatedRouteService;
  
  beforeEach(waitForAsync(() => {
    window.history.pushState({ lat: 123, lng: 456}, '');

    mockActivatedRouteService = jasmine.createSpyObj(['snapshot']);

    TestBed.configureTestingModule({
      declarations: [ CreateSpotComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRouteService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
