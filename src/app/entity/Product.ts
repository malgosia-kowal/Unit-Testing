export class Product {
  public name: string;
  public price: number;
  public quantity: number;
  public size: string;
  public image: string;

  constructor(name: string, price: number, quantity: number, size: string, image: string) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
    this.image = image; 
  }
}
