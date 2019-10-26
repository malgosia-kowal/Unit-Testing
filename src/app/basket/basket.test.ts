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

  it('can toggle quickview', () => {
    const toggleButton = fixture.debugElement.query(By.css('#quickViewButton')).nativeElement;

    toggleButton.click();

    toggleService.visible(Toggable.Quickview).subscribe(value => expect(value).toBeTruthy());

    toggleButton.click();
    
    toggleService.visible(Toggable.Quickview).subscribe(value => expect(value).toBeFalsy());
  });

  it('can clean the basket', () => {
    const product = createProduct();
    basketService.addProduct(product);

    const cleanBasketButton = fixture.debugElement.query(By.css('#clearTheBasketButton')).nativeElement;
    
    cleanBasketButton.click();

    basketService.products.subscribe(products => expect(products).toHaveLength(0));
  });

});
