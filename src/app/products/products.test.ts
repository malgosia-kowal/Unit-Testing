import {
    async,
    ComponentFixture,
    TestBed,
  } from '@angular/core/testing';
  import { ProductsComponent } from './products.component';
 
  import { BasketComponent } from '../basket/basket.component';
  import { BasketService } from '../service/basket.service';
  import { ProductService} from '../service/product.service';
  import { Product } from './product';

  describe('BasketComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let basketService: BasketService;
    let productService: ProductService;
  
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        declarations: [ProductsComponent, BasketComponent],
        providers: [
          { provide: ProductService, useClass: ProductService},
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
  
    /*it('should render correctly', () => {
        //const products = ProductService.getProducts().and.returnValue(true);
       // component.ngOnInit;
        //let tests = new Product();
       
      //spyOn(ProductService, 'ngOnInit().getProducts()'); 
      //fixture.detectChanges(); // trigger ngOnInit here
      expect(component.product).toHaveBeenCalled();
    });
  
    it('can toggle quickview', async () => {
    });
  
    it('can clean the basket', () => {
     });*/
  
  });
  