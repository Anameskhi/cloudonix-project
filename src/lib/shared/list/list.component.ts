import { CommonModule } from '@angular/common';
import { Product } from './../../../app/core/interfaces/product.interface';
import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
 @Input() products!: Product[]
 @Input() productCols!: any
}
