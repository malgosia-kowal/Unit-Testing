  import {
    async,
    ComponentFixture,
    TestBed,
  } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { ProductsComponent } from './products/products.component';
  import { BasketComponent} from './basket/basket.component';
  import { QuickviewComponent } from './quickview/quickview.component';
  import { AppComponent } from './app.component';
  import { ProductDetailComponent } from './product-detail/product-detail.component';
  import { ButtonComponent } from './button/button.component';
  
  describe('App Component', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
      jest.resetAllMocks();
      TestBed.configureTestingModule({
        declarations: [AppComponent, ProductsComponent, QuickviewComponent, BasketComponent, ProductDetailComponent, ButtonComponent],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
  
          fixture.detectChanges();
        });
    }));
    it('should exist', () => {
      expect(component).toBeDefined();
    });
  
    it('should take a snapchot', () => {
      expect(fixture).toMatchSnapshot();
    });

    it('has a  correct title', () => {
      expect(component.title).toContain('Underground Cat Store (Meow)');
    });

    it('contains other component tags inside', () => {
      const appComponentDetail = fixture.debugElement.query(By.css('.container'));
        
      expect(appComponentDetail).not.toBe(null);
    });  

  });