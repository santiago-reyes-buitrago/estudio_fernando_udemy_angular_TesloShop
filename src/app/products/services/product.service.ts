import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {ProductResponse} from '@products/interfaces/product-response.interface';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  getProducts(){
    return this.http.get<ProductResponse[]>(`http://localhost:3000/api/products`).pipe(
      tap(resp => console.log(resp))
    );
  }
}
