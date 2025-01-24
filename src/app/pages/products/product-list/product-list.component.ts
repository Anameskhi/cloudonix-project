import { productCols } from '../consts';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ListComponent } from '../../../../lib/shared/list/list.component';
import { Product } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productCols = productCols
  products = signal<Product[]>([])
  productServcie = inject(ProductsService)
  items: any | undefined;


  ngOnInit(): void {
    this.productServcie.getProducts().subscribe((res) => {
      this.products.set(res);
      const enrichedProducts = res.map((product: Product, i: number) => ({
        ...product,
        index: i + 1,
      }));

      this.products.set(enrichedProducts);
    });
  }
  deleteProduct(product: Product) {
    console.log(product)
    this.productServcie.deleteProduct(product.id).subscribe(() => {
      this.products.update((products) => products.filter((p) => p.id !== product.id));
    });
  }
}
