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
  import { MoneyPipe } from "./pipes/money";
  import {
    TranslateModule,
    TranslateLoader,
  } from "@ngx-translate/core";
  import { MockCustomLoader } from "./tests/mocks/translation";

  describe('App Component', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
      jest.resetAllMocks();
      TestBed.configureTestingModule({
        declarations: [AppComponent, ProductsComponent, QuickviewComponent, BasketComponent, ProductDetailComponent, ButtonComponent, MoneyPipe],
        imports: [
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: MockCustomLoader }
          })
        ],
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

    it('contains other nested component with the correct order', () => {
      const appProductsComponent = fixture.debugElement.query(By.css('.container')).children[0].name;
      const QuickviewComponent = fixture.debugElement.query(By.css('.container')).children[1].name;
      const BasketComponent = fixture.debugElement.query(By.css('.container')).children[2].name;

      expect(appProductsComponent).toContain('app-products');
      expect(QuickviewComponent).toContain('app-quickview');
      expect(BasketComponent).toContain('app-basket');
    });  
  });