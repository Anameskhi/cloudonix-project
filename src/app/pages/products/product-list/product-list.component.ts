import { productCols } from '../consts';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ListComponent } from '../../../../lib/shared/list/list.component';
import { Product } from '../../../core/interfaces/product.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ListComponent,ConfirmDialogModule,ToastModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ConfirmationService,MessageService]
})
export class ProductListComponent implements OnInit {

  productCols = productCols
  products = signal<Product[]>([])
  productServcie = inject(ProductsService)
  items: any | undefined;
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.getProucts()
  }

  getProucts(): void {
    this.productServcie.getProducts().subscribe((res) => {
      this.products.set(res);
      const enrichedProducts = res.map((product: Product, i: number) => ({
        ...product,
        index: i + 1,
      }));

      this.products.set(enrichedProducts);
    });
  }
  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the product "${product.name}"?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
      },
      accept: () => {
        this.deleteProduct(product);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: `Product "${product.name}" has been deleted successfully.`,
        });
      },
      reject: () => {
        console.log('Deletion canceled');
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: `Deletion of product "${product.name}" was cancelled.`,
          life: 3000
        });
      },
    });
  }
  deleteProduct(product: Product): void {
    console.log(product)
    this.productServcie.deleteProduct(product.id).subscribe(() => {
      this.products.update((products) => products.filter((p) => p.id !== product.id));
    });
  }
}
