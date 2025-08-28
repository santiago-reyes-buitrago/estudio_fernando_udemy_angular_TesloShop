import {Component, input} from '@angular/core';

@Component({
  selector: 'carrousel-item',
  imports: [],
  templateUrl: './carrousel-item.html',
  styleUrl: './carrousel-item.css'
})
export class CarrouselItem {
  id = input.required<number>();
  image = input.required<string>();
  alt = input.required<string>();
}
