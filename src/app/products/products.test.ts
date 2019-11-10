import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { BasketService } from '../service/basket.service';
import { ButtonComponent } from '../button/button.component'
import { ProductService } from '../service/product.service';
import { createProduct } from '../factory/Product';
import { By } from '@angular/platform-browser';

class MockProductsService {
  getProducts = jest.fn(() => []);
}

describe('Products Component', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let basketService: BasketService;
  let productService: MockProductsService;

  beforeEach(async(async () => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductDetailComponent, ButtonComponent],
      providers: [
        { provide: ProductService, useClass: MockProductsService},
        { provide: BasketService, useClass: BasketService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;

        basketService = TestBed.get(BasketService);
        productService = TestBed.get(ProductService);

        fixture.detectChanges();
      });
  }));

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should fetch products on init', () => {
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle with no products', () => {
    expect(component.products).toHaveLength(0);  

    expect(fixture).toMatchSnapshot();
  });

  it('can render products', () => {
    const product1 = createProduct({ name: 'test', size: '8', image: "url", price: 8 }, )
    const product2 = createProduct({ name: 'test2', size: '8', image: "url", price: 4 }, )
    productService.getProducts.mockImplementation(() => [product1, product2]);

    component.ngOnInit();

    expect(component.products).toHaveLength(2);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('add products to the basket', () => {
    const product1 = createProduct({ name: 'test2', size: '8', image: "url", price: 4 });
    productService.getProducts.mockImplementation(() => [product1]);

    component.ngOnInit();

    fixture.detectChanges();
    
    basketService.addProduct(product1);
    fixture.detectChanges();

    expect(basketService.get().products.getValue().length).toEqual(1);

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('can select product', () => {
    const product1 = createProduct({ name: 'test2', size: '8', image: "url", price: 4 });
    const product2 = createProduct({ name: 'test3', size: '8', image: "url", price: 9 });
    productService.getProducts.mockImplementation(() => [product1, product2]);

    component.ngOnInit();

    fixture.detectChanges();

    component.onSelect(product1);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    
    const test = fixture.debugElement.query(By.css('app-product-detail')).componentInstance;

    expect(test).toMatchObject({product: product1});
  });

  it('has no selected product at the start', () => {
    const product1 = createProduct({ name: 'test2', size: '8', image: "url", price: 4 });
    const product2 = createProduct({ name: 'test3', size: '8', image: "url", price: 9 });

    productService.getProducts.mockImplementation(() => [product1, product2]);

    component.ngOnInit();

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    
    const test = fixture.debugElement.query(By.css('app-product-detail')).componentInstance;
    
    expect(test).toBeUndefined;
  });
   
});
  