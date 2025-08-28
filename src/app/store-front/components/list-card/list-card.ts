import {Component, input} from '@angular/core';
import {Card} from '@store-front/components/card/card';
import {Product} from '@products/interfaces/product-response.interface';

@Component({
  selector: 'store-list-card',
  imports: [
    Card
  ],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css'
})
export class ListCard {
  data = input.required<Product[]>()
}
