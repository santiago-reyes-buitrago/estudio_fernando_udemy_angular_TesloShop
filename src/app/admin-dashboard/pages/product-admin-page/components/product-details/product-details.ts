import {Component, input} from '@angular/core';
import {Carrousel} from '@products/components/carrousel/carrousel';

@Component({
  selector: 'product-details',
  imports: [
    Carrousel
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  product = input.required<any>()

  sizes = ['XS','S','M','L','XL','XXL'];
}
