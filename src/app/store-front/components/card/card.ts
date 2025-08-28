import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '@products/interfaces/product-response.interface';
import {DecimalPipe, JsonPipe, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';
import {ProductService} from '@products/services/product.service';
import {Carrousel} from '@store-front/components/carrousel/carrousel';

@Component({
  selector: 'store-card',
  imports: [
    RouterLink,
    JsonPipe,
    UpperCasePipe,
    DecimalPipe,
    NgOptimizedImage,
    Carrousel
  ],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  private productService = inject(ProductService);
  data = input.required<Product>()
  imageResource = rxResource({
    params: () => ({
      image: this.data().images
    }),
    stream: ({params}) => {
      return this.productService.getFileProductsImageArray(params.image)
    }
  })

}
