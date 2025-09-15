import {AfterViewInit, Component, ElementRef, input, OnChanges, signal, SimpleChanges, viewChild} from '@angular/core';
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
export class Carrousel implements AfterViewInit,OnChanges{
  swiperContainer = viewChild.required<ElementRef>('swiperContainer')
  images = input.required<string[]>()
  direction = input<"horizontal" | "vertical">('horizontal')
  swipper = signal<Swiper|null>(null);

  ngAfterViewInit(): void {
    this.swipperInited();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'].firstChange){
      return;
    }
    if (!this.swipper()){
      return;
    }
    this.swipper()?.destroy(true,true)
    this.swipperInited();
  }

  swipperInited(): void {
    const element = this.swiperContainer().nativeElement;
    if (!element) return;
    this.swipper.set(new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,

      modules: [Navigation,Pagination],

      // If we need pagination
      pagination: {
        clickable: true,
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
    }));
  }


}
