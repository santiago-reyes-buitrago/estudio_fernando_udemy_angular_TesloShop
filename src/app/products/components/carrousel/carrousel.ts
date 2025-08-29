import {Component, input} from '@angular/core';
import {CarrouselItem} from '@products/components/carrousel-item/carrousel-item';

@Component({
  selector: 'product-list-carrousel',
  imports: [
    CarrouselItem
  ],
  templateUrl: './carrousel.html',
  styleUrl: './carrousel.css'
})
export class Carrousel {
  images = input.required<string[]>()
}
