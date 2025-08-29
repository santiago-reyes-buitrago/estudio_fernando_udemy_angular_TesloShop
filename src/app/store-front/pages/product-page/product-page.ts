import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ProductService} from '@products/services/product.service';
import {Carrousel} from '@products/components/carrousel/carrousel';

@Component({
  selector: 'app-product-page',
  imports: [
    Carrousel
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params: Params) => params['idSlug'] ?? '')
  ))
  productsService = inject(ProductService);
  productResource = rxResource({
    params: () => ({
      query: this.query()
    }),
    stream: ({params}) => {return this.productsService.getProduct(params.query as string)}
  })
  imageResource = rxResource({
    params: () => ({
      image: this.productResource.value()?.images
    }),
    stream: ({params}) => {
      return this.productsService.getFileProductsImageArray(params.image!)
    }
  })
}
