import { CommonModule } from '@angular/common';
import { Product } from './../../../app/core/interfaces/product.interface';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,CommonModule,ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
 @Input() products!: Product[]
 @Input() productCols!: any
 @Input() navigateToRoute!: string;
 @Output() deleteProduct = new EventEmitter<Product>();

 router = inject(Router);
 previewProduct(product: Product): void {
  console.log(product);
  if (this.navigateToRoute) {
    this.router.navigate([this.navigateToRoute, product.id]);
  } else {
    console.error('No route path provided for navigation');
  }
}

onDeleteProduct( product: Product,event: MouseEvent): void {
  event.stopPropagation(); 
  this.deleteProduct.emit(product);
}

}
