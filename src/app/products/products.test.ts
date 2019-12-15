import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductsComponent } from "./products.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { BasketService } from "../service/basket.service";
import { ButtonComponent } from "../button/button.component";
import { ProductService } from "../service/product.service";
import { createProduct } from "../factory/Product";
import { By } from "@angular/platform-browser";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { MockCustomLoader } from "../tests/mocks/translation";
import { MoneyPipe } from "../pipes/money";
import { BehaviorSubject } from "rxjs";
import { Locale } from "../app.component";

class MockProductsService {
  getProducts = jest.fn(() => new BehaviorSubject([]));
  convertProductsPrice = jest.fn();
}

describe("Products Component", () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let basketService: BasketService;
  let productService: MockProductsService;
  let translate: TranslateService;

  beforeEach(async(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductDetailComponent,
        ButtonComponent,
        MoneyPipe
      ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockCustomLoader }
        })
      ],
      providers: [
        { provide: ProductService, useClass: MockProductsService },
        { provide: BasketService, useClass: BasketService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;

        basketService = TestBed.get(BasketService);
        productService = TestBed.get(ProductService);
        translate = TestBed.get(TranslateService);
        translate.use(Locale.Gb);

        fixture.detectChanges();
      });
  }));

  it("should exist", () => {
    expect(component).toBeDefined();
  });

  it("should fetch products on init", () => {
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  it("should handle with no products", () => {
    expect(component.products).toHaveLength(0);

    expect(fixture).toMatchSnapshot();
  });

  it("can render products", () => {
    const product1 = createProduct({
      name: "test",
      size: "8",
      image: "url",
      price: 8
    });
    const product2 = createProduct({
      name: "test2",
      size: "8",
      image: "url",
      price: 4
    });
    productService.getProducts.mockImplementation(
      () => new BehaviorSubject([product1, product2])
    );

    component.ngOnInit();

    expect(component.products).toHaveLength(2);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it("add products to the basket", () => {
    const product1 = createProduct({
      name: "test2",
      size: "8",
      image: "url",
      price: 4
    });
    productService.getProducts.mockImplementation(
      () => new BehaviorSubject([product1])
    );

    component.ngOnInit();

    fixture.detectChanges();

    basketService.addProduct(product1);
    fixture.detectChanges();

    expect(basketService.get().products.getValue().length).toEqual(1);
  });

  it("can select product", () => {
    const product1 = createProduct({
      name: "test2",
      size: "8",
      image: "url",
      price: 4
    });
    const product2 = createProduct({
      name: "test3",
      size: "8",
      image: "url",
      price: 9
    });
    productService.getProducts.mockImplementation(
      () => new BehaviorSubject([product1, product2])
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.product).toBeUndefined();

    component.onSelect(product1);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();

    const ProductDetailComponent = fixture.debugElement.query(
      By.css("app-product-detail")
    ).componentInstance;

    expect(component.product).toEqual(product1);
    expect(ProductDetailComponent).toMatchObject({ product: product1 });
  });
});
