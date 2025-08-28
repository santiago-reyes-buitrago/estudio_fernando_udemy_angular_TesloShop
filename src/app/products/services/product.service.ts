import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {ProductResponse} from '@products/interfaces/product-response.interface';
import {forkJoin, map, Observable, switchMap, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

const baseUrl = environment.baseURl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductResponse> {
    const {limit=0,offset=0,gender=''} = options;

    return this.http.get<ProductResponse>(`${baseUrl}/products`,{
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(
      tap(resp => console.log(resp))
    );
  }

  getFileProductsImageArray(image: string[]):Observable<string[]> {
    return forkJoin(image.map(item => this.getFileProductsImage(item))).pipe(
      tap(resp => console.log('images',resp))
    );
  }

  getFileProductsImage(image: string){
    return this.http.get(`${baseUrl}/files/product/${image}`, {
      responseType: 'blob'
    }).pipe(
      map(resp => {
        return URL.createObjectURL(resp);
      })
    );
  }
}
