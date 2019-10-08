import { Component, OnInit } from '@angular/core';
import { Toggable, ToggleService } from '../service/toggle.service';
import { Product } from '../products/product';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  visible: boolean;
  products: Product[];
  constructor(public toggleService: ToggleService, private basketService: BasketService) { }

  ngOnInit() {
    this.toggleService.visible(Toggable.Quickview).subscribe(visible => {
      this.visible = visible;
    });
    this.products = this.basketService.products;
  }

}
