import {Component, input} from '@angular/core';
import {Product} from '@products/interfaces/product-response.interface';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [
    ProductImagePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css'
})
export class ProductTable {
  products = input.required<Product[]>()
}
