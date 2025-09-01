import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ProductService} from '@products/services/product.service';
import {ListCard} from '@products/components/list-card/list-card';

@Component({
  selector: 'app-gender-page',
  imports: [
    ListCard
  ],
  templateUrl: './gender-page.html',
  styleUrl: './gender-page.css'
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  gender = toSignal(this.route.params.pipe(map(({gender})=> gender)  ))

  genderResource = rxResource({
    params: () => ({
      gender: this.gender()
    }),
    stream: ({params})=> {
      return this.productService.getProducts({
        limit: 10,
        gender: params.gender
      })
    }
  })
}
