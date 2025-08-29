import {Component, input} from '@angular/core';
import {Card} from '@products/components/card/card';
import {Product} from '@products/interfaces/product-response.interface';

@Component({
  selector: 'product-list-card',
  imports: [
    Card
  ],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css'
})
export class ListCard {
  data = input.required<Product[]>()
}
