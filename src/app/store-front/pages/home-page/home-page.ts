import {Component, inject} from '@angular/core';
import {ListCard} from '../../components/list-card/list-card';
import {ProductService} from '@products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [
    ListCard
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  productsService = inject(ProductService);
  productResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {return this.productsService.getProducts()}
  })
}
