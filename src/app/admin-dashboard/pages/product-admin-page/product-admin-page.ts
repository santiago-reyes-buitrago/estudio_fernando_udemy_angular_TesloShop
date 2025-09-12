import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ProductService} from '@products/services/product.service';
import {ProductDetails} from '@admin/pages/product-admin-page/components/product-details/product-details';

@Component({
  selector: 'app-product-admin-page',
  imports: [
    ProductDetails
  ],
  templateUrl: './product-admin-page.html',
  styleUrl: './product-admin-page.css'
})
export class ProductAdminPage {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  productID = toSignal(this.activatedRoute.params.pipe(
    map((params) => params['id']),
  ));
  productResource = rxResource({
    params: () => ({
      id: this.productID()
    }),
    stream: ({params}) =>  {
      return this.productService.getProduct(params.id)
    }
  })

  redirectEffect = effect(()=> {
    if (this.productResource.error()) {
      console.log(this.productResource.error());
      this.router.navigate(['/admin/products']);
    }
  })
}
