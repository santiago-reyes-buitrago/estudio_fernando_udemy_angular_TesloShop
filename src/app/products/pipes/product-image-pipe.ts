import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value ? value : '/assets/images/no-image.jpg';
  }

}
