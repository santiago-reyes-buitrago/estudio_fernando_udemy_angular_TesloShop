import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gender, Product, ProductResponse} from '@products/interfaces/product-response.interface';
import {catchError, forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserResponse} from '@auth/interfaces/auth-response.interface';

const baseUrl = environment.baseURl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  description: '',
  gender: Gender.Men,
  id: 'new',
  images: [],
  price: 0,
  sizes: [],
  slug: '',
  stock: 0,
  tags: [],
  title: '',
  user: {} as UserResponse
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductResponse> {
    const {limit = 0, offset = 0, gender = ''} = options;

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(
      switchMap(({products, ...rest}) => {
        const img$ = products.map(({images}) => this.getFileProductsImageArray(images).pipe(
          map(images => images),
          catchError(err => {
            console.error(err);
            return of([])
          })
        ))
        return forkJoin(img$).pipe(
          map(imagess => ({
            ...rest,
            products: products.map(({images, ...restp}, index) => ({
              ...restp,
              imagesURL: imagess[index],
              images: images
            }))
          }))
        )
      }),
      tap(resp => console.log(resp))
    );
  }

  getProduct(idSlug: string): Observable<Product> {
    console.log({idSlug});
    if (idSlug === emptyProduct.id) {
      return of(emptyProduct);
    }
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`, {}).pipe(
      switchMap(({images, ...rest}) => {
        const img$ = this.getFileProductsImageArray(images).pipe(
          map(images => images),
        )
        return forkJoin([img$]).pipe(
          map(imagess => ({
            ...rest,
            imagesURL: imagess[0],
            images: images
          }))
        )
      }),
      tap(resp => console.log(resp))
    );
  }

  getFileProductsImageArray(image: string[]): Observable<string[]> {
    if (image.length === 0) {
      return of([]);
    }
    return forkJoin(image.map(item => this.getFileProductsImage(item)));
  }

  getFileProductsImage(image: string) {
    return this.http.get(`${baseUrl}/files/product/${image}`, {
      responseType: 'blob'
    }).pipe(
      map(resp => {
        return URL.createObjectURL(resp);
      })
    );
  }

  createProduct(productLike: Partial<Product>):Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, productLike).pipe(
      catchError(err => {
        console.error(err)
        return of(emptyProduct)
      })
    )
  }

  updateProduct(id: string, productLike: Partial<Product>) {
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike).pipe(
      catchError(err => {
        console.error(err)
        return of([])
      })
    )
  }
}
