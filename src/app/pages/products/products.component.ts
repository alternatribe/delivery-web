import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  listaProducts: Product[] = [];
  productInscription: Subscription = new Subscription;

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.productInscription.unsubscribe();
  }

  ngOnInit(): void {
    this.productInscription = this.productService.list().subscribe(produtos => this.listaProducts = produtos);
  }

}
