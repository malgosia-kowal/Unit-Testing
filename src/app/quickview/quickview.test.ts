import {
    async,
    ComponentFixture,
    TestBed,
  } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { BasketComponent } from '../basket/basket.component';
  import { ButtonComponent } from '../button/button.component';
  import { BasketService } from '../service/basket.service';
  import { ToggleService, Toggable } from '../service/toggle.service';
  import { createProduct } from '../factory/Product';
  import{QuickviewComponent} from './quickview.component';
  import { tap, map } from 'rxjs/operators';
  import { BehaviorSubject } from 'rxjs';
  import { DebugElement, asNativeElements } from '@angular/core';
  import { debug } from 'util';
 
  
  describe('Quickview component', () => {
    let quickviewComponent: QuickviewComponent;
    let basketComponent: BasketComponent;
    let fixture: ComponentFixture<QuickviewComponent>;
    let fixture2: ComponentFixture<BasketComponent>;
    let toggleService: ToggleService;
    let basketService: BasketService;
    
  
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        declarations: [BasketComponent, ButtonComponent, QuickviewComponent],
        providers: [
          { provide: ToggleService, useClass: ToggleService },
          { provide: BasketService, useClass: BasketService }
        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(QuickviewComponent);
          quickviewComponent = fixture.componentInstance;

          fixture2 = TestBed.createComponent(BasketComponent);
          basketComponent = fixture2.componentInstance;

          toggleService = TestBed.get(ToggleService);
          basketService = TestBed.get(BasketService);

          fixture.detectChanges();
        });
    }));
  
    it('should exist', () => {
      expect(quickviewComponent).toBeDefined();
    });
  
    it('should render correctly', () => {
      expect(fixture).toMatchSnapshot();
    });
  
    it('quick view should be visible', () => {
      fixture.detectChanges();
  
      expect(fixture).toMatchSnapshot();
    });
  
    it('should set the dependecies', () => {
      quickviewComponent.ngOnInit();
  
      expect(quickviewComponent.toggleService).toBe(toggleService);
    });
  
    it('should check if quickView is visible with products', async () => {
      const product = createProduct({price:200});
      basketService.addProduct(product);

      const toggleButton = fixture2.debugElement.query(By.css('#quickViewButton'));
      toggleButton.triggerEventHandler('action', 'test');
  
      const visibleSubject = (toggleService.visible(Toggable.Quickview).source as BehaviorSubject<boolean>);
      expect(visibleSubject).toBeTruthy();

      fixture2.detectChanges();
      expect(fixture2).toMatchSnapshot();
    });
  
    it('should remove product from quickView', () => {
      const product = createProduct();
      basketService.addProduct(product);
      
      const toggleButton = fixture2.debugElement.query(By.css('#quickViewButton'));
      toggleButton.triggerEventHandler('action', 'test');
      fixture.detectChanges();
  
      const removeProductButton = fixture.debugElement.query(By.css('.closeIcon'));
      removeProductButton.triggerEventHandler('click', 'test');
      fixture.detectChanges();

      expect(basketComponent.basketService.get().products.getValue().length).toEqual(0);
    });

    it('should check if overlay is visible', () => {
      const product = createProduct({price:300, size:'green', name:'kity'});
      basketService.addProduct(product);
      
      const quickViewButton = fixture2.debugElement.query(By.css('#quickViewButton'));
    
      quickViewButton.triggerEventHandler('action', 'test');
      fixture.detectChanges();
  
      const overlayButton = fixture.debugElement.query(By.css('.overlay'));
      expect(overlayButton).toBeTruthy();

      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });

    it('should close quickView when click on overlay', () => {
      const product = createProduct();
      basketService.addProduct(product);
      
      const quickViewButton = fixture2.debugElement.query(By.css('#quickViewButton'));
    
      quickViewButton.triggerEventHandler('action', 'test');
      fixture.detectChanges();
  
      const overlayButton = fixture.debugElement.query(By.css('.overlay'));
      overlayButton.triggerEventHandler('click', null);
      fixture2.detectChanges();
 
      const quickView = (toggleService.visible(Toggable.Quickview).source as BehaviorSubject<boolean>);
      expect(quickView.getValue()).toBeFalsy();

      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });