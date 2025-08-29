import {Component, input} from '@angular/core';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';

@Component({
  selector: 'product-image-carrousel-item',
  imports: [
    ProductImagePipe
  ],
  templateUrl: './carrousel-item.html',
  styleUrl: './carrousel-item.css'
})
export class CarrouselItem {
  id = input.required<string>();
  image = input.required<string>();
  alt = input.required<string>();
}
