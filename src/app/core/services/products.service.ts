import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {


  getProducts(): Observable<Product[]> {
   return  this.get<Product[]>()
  }
  getProduct(id: string): Observable<Product> {
    return  this.get<Product>(id)
   }

  addProduct(product: Product): Observable<Product> {
    return this.post<Product>(product)
  }
  deleteProduct(id: number): Observable<Product> {
    return this.delete<Product>(id)
  }
}
