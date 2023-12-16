import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UnsplashService } from '../../services/unsplash.service';
import { MockActivatedRoute } from '../../../testing/mock-activatedRoute'; 
import { DetailsComponent } from './details.component';



describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        // Provide the UnsplashService
        UnsplashService,
        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
      imports: [DetailsComponent, HttpClientTestingModule]
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
