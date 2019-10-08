import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { Toggable, ToggleService } from '../service/toggle.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(public basketService: BasketService, public toggleService: ToggleService) { }

  ngOnInit() {
  }

  toggleQuickview() {
    this.toggleService.toggle(Toggable.Quickview);
  }

}
