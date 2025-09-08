import {Component, inject, signal} from '@angular/core';
import {ProductTable} from '@products/components/product-table/product-table';
import {ProductService} from '@products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';

type TypeParameter = 'limit'|'page';

@Component({
  selector: 'app-products-admin-page',
  imports: [
    ProductTable,
    FormsModule
  ],
  templateUrl: './products-admin-page.html',
  styleUrl: './products-admin-page.css'
})
export class ProductsAdminPage {
  productsService = inject(ProductService);
  parameters = signal({
    limit: 10,
    page:1
  })
  productResource = rxResource({
    params: () => this.parameters(),
    stream: ({params}) => {return this.productsService.getProducts({
      limit: params.limit,
      offset: params.page*params.limit
    })}
  })

  handleParamaters(number: number,type:TypeParameter) {
    this.parameters.update((item) => ({...item, [type]: number}));
  }
}
