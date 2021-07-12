import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() produto!: Product;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  add(produto: Product) {
    this.orderService.add(produto);
  }

}
