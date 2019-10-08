import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from '../service/product.service';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  products: Product[];

  constructor(private productService: ProductService, private basketService: BasketService) {
    this.productService = productService;
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  onSelect(product: Product) {
    this.product = product;
  }

  addProduct(product: Product) {
    this.basketService.addProduct(product);
  }
}
