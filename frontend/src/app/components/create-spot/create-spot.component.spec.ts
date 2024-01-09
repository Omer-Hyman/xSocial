import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CreateSpotComponent } from './create-spot.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { Spot } from 'src/app/interfaces';
import { LocalStorageService } from 'src/app/services/LocalStorageService/local-storage.service';

describe('CreateSpotComponent', () => {
  let component: CreateSpotComponent;
  let fixture: ComponentFixture<CreateSpotComponent>;
  // let mockActivatedRouteService: ActivatedRoute;
  let mapService: MapService;
  let apiService: ApiService;
  let storage: LocalStorageService;
  let router: Router;
  
  beforeEach(waitForAsync(() => {
    window.history.pushState({ lat: 123, lng: 456}, '');

    // mockActivatedRouteService = jasmine.createSpyObj(['snapshot']);

    TestBed.configureTestingModule({
      declarations: [ CreateSpotComponent ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },
      ],
    }).compileComponents();

    mapService = TestBed.inject(MapService);
    apiService = TestBed.inject(ApiService);
    storage = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CreateSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('initialising map', async () => {
      const initialiseMapSpy = spyOn(mapService, 'initialiseMap').and.callThrough();
      initialiseMapSpy.and.resolveTo(undefined);
      const clearMarkersSpy = spyOn(mapService, 'clearMarkers');
      const setMarkerSpy = spyOn(mapService, 'setMarker');
      
      await component.ngOnInit();
      
      expect(initialiseMapSpy).toHaveBeenCalled();
      expect(clearMarkersSpy).toHaveBeenCalled();
      expect(setMarkerSpy).toHaveBeenCalled();
    });
  });

  describe('submitForm', () => {
    it('new spot without image', async () => {
      component.editSpotForm.setValue({
        spotName: 'name',
        spotDescription: 'desc',
        sportDropdown: 'bmx',
        image: []
      });
      spyOn(storage, 'getCurrentUser').and.returnValue({
        id: 123,
        token: 'toke',
        username: 'user'
      });
      const spot: Spot = {
        createdBy: 123,
        name: 'name',
        description: 'desc',
        latitude: 123,
        longitude: 456,
        suitableFor: ['bmx'],
        image: ''
      };
      const apiSPy = spyOn(apiService, 'postSpot');
      const routerSpy = spyOn(router, 'navigate');
      // const file: File = {
      //   lastModified: 1582206746000,
      //   name: "cow.bmp",
      //   size: 52378,
      //   type: "image/bmp",
      //   webkitRelativePath: ""
      // };
      // const mockFile: File = new File()
      // component.onImageChange(new Event('img/jpeg', ));
      // fixture.detectChanges();
      await component.submitForm();

      expect(apiSPy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });
  });

});
