import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { ButtonComponent } from '../button/button.component';
import { BasketService } from '../service/basket.service';
import { ToggleService } from '../service/toggle.service';

class MockToggleService {

}


describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let toggleService: ToggleService;

  beforeEach(async(async () => {
    TestBed.configureTestingModule({
      declarations: [BasketComponent, ButtonComponent],
      providers: [
        { provide: ToggleService, useClass: MockToggleService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;

        toggleService = TestBed.get(ToggleService);

        fixture.detectChanges();
      });
  }));

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should set the toggleService', () => {
    const toggleService = new ToggleService();
    component.ngOnInit();
    expect(component.toggleService).toBe(toggleService);
  });

});
