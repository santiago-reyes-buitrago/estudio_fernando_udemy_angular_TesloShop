import {Component, inject} from '@angular/core';
import {ListCard} from '@products/components/list-card/list-card';
import {ProductService} from '@products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    ListCard,
    JsonPipe
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  productsService = inject(ProductService);
  productResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {return this.productsService.getProducts({
      limit: 12
    })}
  })
}
