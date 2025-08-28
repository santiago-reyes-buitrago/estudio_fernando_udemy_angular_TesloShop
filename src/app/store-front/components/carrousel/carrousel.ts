import {Component, input} from '@angular/core';
import {CarrouselItem} from '@store-front/components/carrousel-item/carrousel-item';

@Component({
  selector: 'list-carrousel',
  imports: [
    CarrouselItem
  ],
  templateUrl: './carrousel.html',
  styleUrl: './carrousel.css'
})
export class Carrousel {
  images = input.required<string[]>()
}
