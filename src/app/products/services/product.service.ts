import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {Product, ProductResponse} from '@products/interfaces/product-response.interface';
import {catchError, forkJoin, map, Observable, switchMap, tap} from 'rxjs';
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
      switchMap(({products,...rest}) => {
        const img$ = products.map(({images,...rest}) => this.getFileProductsImageArray(images).pipe(
          map(images => images),
        ))
        return forkJoin(img$).pipe(
          map(imagess => ({
            ...rest,
            products: products.map(({images, ...restp},index) => ({
              ...restp,
              images: imagess[index]
            }))
          }))
        )
      }),
      tap(resp => console.log(resp))
    );
  }

  getProduct(idSlug: string):Observable<Product>{
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`,{}).pipe(
      switchMap(({images,...rest}) => {
        const img$ = this.getFileProductsImageArray(images).pipe(
          map(images => images),
        )
        return forkJoin([img$]).pipe(
          map(imagess => ({
            ...rest,
            images: imagess[0]
          }))
        )
      }),
      tap(resp => console.log(resp))
    );
  }

  getFileProductsImageArray(image: string[]):Observable<string[]> {
    return forkJoin(image.map(item => this.getFileProductsImage(item)));
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

  updateProduct(producLike: Partial<Product>){
    console.log(producLike,'Actualizando producto');
  }
}
