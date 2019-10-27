import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BasketComponent } from './basket.component';
import { ButtonComponent } from '../button/button.component';
import { BasketService } from '../service/basket.service';
import { ToggleService, Toggable } from '../service/toggle.service';
import { createProduct } from '../factory/Product';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let toggleService: ToggleService;
  let basketService: BasketService;

  beforeEach(async(async () => {
    TestBed.configureTestingModule({
      declarations: [BasketComponent, ButtonComponent],
      providers: [
        { provide: ToggleService, useClass: ToggleService },
        { provide: BasketService, useClass: BasketService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;

        toggleService = TestBed.get(ToggleService);
        basketService = TestBed.get(BasketService);

        fixture.detectChanges();
      });
  }));

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with cat in the basket', () => {
    const product = createProduct({ price: 320 });
    component.basketService.addProduct(product);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should set the dependecies', () => {
    component.ngOnInit();

    expect(component.toggleService).toBe(toggleService);
    expect(component.basketService).toBe(basketService);
  });

  it('can toggle quickview', async () => {
    const toggleButton = fixture.debugElement.query(By.css('#quickViewButton'));

    toggleButton.triggerEventHandler('action', 'test');

    const visibleSubject = (toggleService.visible(Toggable.Quickview).source as BehaviorSubject<boolean>);

    expect(visibleSubject.getValue()).toBeTruthy();

    toggleButton.triggerEventHandler('action', 'test');
    expect(visibleSubject.getValue()).toBeFalsy();
  });

  it('can clean the basket', () => {
    const product = createProduct();
    component.basketService.addProduct(product);
    fixture.detectChanges();
    const cleanBasketButton = fixture.debugElement.query(By.css('#clearTheBasketButton'));

    cleanBasketButton.triggerEventHandler('action', 'test');

    expect(component.basketService.products.getValue().length).toEqual(0);
  });

});
