  import {
    async,
    ComponentFixture,
    TestBed,
  } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { BasketService } from '../service/basket.service';
  import { ToggleService, Toggable } from '../service/toggle.service';
  import { createProduct } from '../factory/Product';
  import {QuickviewComponent} from './quickview.component';
  import { BehaviorSubject } from 'rxjs';
  
  describe('Quickview component', () => {
    let quickviewComponent: QuickviewComponent;
    let fixture: ComponentFixture<QuickviewComponent>;
    let toggleService: ToggleService;
    let basketService: BasketService;
    
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        declarations: [QuickviewComponent],
        providers: [
          { provide: ToggleService, useClass: ToggleService },
          { provide: BasketService, useClass: BasketService }
        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(QuickviewComponent);
          quickviewComponent = fixture.componentInstance;

          toggleService = TestBed.get(ToggleService);
          basketService = TestBed.get(BasketService);

          fixture.detectChanges();
        });
    }));
    it('should exist', () => {
      expect(quickviewComponent).toBeDefined();
    });
  
    it('should render closed by default', () => {
      expect(fixture).toMatchSnapshot();
    });
  
    it('can render empty', () => {
      quickviewComponent.toggleService.toggle(Toggable.Quickview);

      expect(quickviewComponent.visible).toBeTruthy();

      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  
    it('should set the dependecies', () => {
      quickviewComponent.ngOnInit();
  
      expect(quickviewComponent.toggleService).toBe(toggleService);
    });
  
    it('should render products when is visible', () => {
      const product = createProduct({ price:300, size:'green', name:'kity' });
      
      basketService.addProduct(product);

      quickviewComponent.toggleService.toggle(Toggable.Quickview);

      fixture.detectChanges();
      
      expect(basketService.products.getValue().length).toEqual(1);

      expect(fixture).toMatchSnapshot();
    });
  
    it('should remove product from quickView', () => {
      const product = createProduct();
      basketService.addProduct(product);
      
      quickviewComponent.toggleService.toggle(Toggable.Quickview);

      fixture.detectChanges();
  
      const removeProductButton = fixture.debugElement.query(By.css('.closeIcon'));
      removeProductButton.triggerEventHandler('click', 'test');

      fixture.detectChanges();

      expect(basketService.get().products.getValue().length).toEqual(0);
    });

    it('should close quickView when click on overlay', () => {
      quickviewComponent.toggleService.toggle(Toggable.Quickview);

      fixture.detectChanges();
  
      const overlay = fixture.debugElement.query(By.css('.overlay'));
      overlay.triggerEventHandler('click', null);
 
      const quickViewVisibleSubject= (toggleService.visible(Toggable.Quickview).source as BehaviorSubject<boolean>);
      
      expect(quickViewVisibleSubject.getValue()).toBeFalsy();

      fixture.detectChanges();
      
      expect(fixture).toMatchSnapshot();
    });
  });