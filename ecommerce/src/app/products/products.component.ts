import { Component, OnInit } from '@angular/core';
import {Product} from "./product";

const products:Product[] = [
  { name:'nikey', price: 123, quantity: 1, size: '8', image: 'http://placekitten.com/200/300'},
  { name:'nikey', price: 123, quantity: 1, size: '8.5', image: 'http://placekitten.com/200/300'},
  { name:'rebook', price: 123, quantity: 1, size: '9', image: 'http://placekitten.com/200/300'},
  { name:'cream', price: 123, quantity: 1, size: '10', image: 'http://placekitten.com/200/300'},
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product = {
    name:'nikey',
    price: 123,
    quantity: 1,
    size: '8',
    image: 'http://placekitten.com/200/300',
  };
  products:Product[] = products;
  constructor() {
    console.log(this.product);
  }

  ngOnInit() {
  }

  onSelect(product:Product) {
    console.log(product)
  }

}
