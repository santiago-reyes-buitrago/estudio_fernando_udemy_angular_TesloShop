import {AfterViewInit, Component, ElementRef, input, viewChild} from '@angular/core';
import {CarrouselItem} from '@products/components/carrousel-item/carrousel-item';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';

@Component({
  selector: 'product-list-carrousel',
  imports: [
    CarrouselItem,
    ProductImagePipe
  ],
  templateUrl: './carrousel.html',
  styleUrl: './carrousel.css'
})
export class Carrousel implements AfterViewInit {
  swiperContainer = viewChild.required<ElementRef>('swiperContainer')
  images = input.required<string[]>()
  direction = input<"horizontal" | "vertical">('horizontal')

  ngAfterViewInit(): void {
    const element = this.swiperContainer().nativeElement;
    if (!element) return;
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,

      modules: [Navigation,Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

}
