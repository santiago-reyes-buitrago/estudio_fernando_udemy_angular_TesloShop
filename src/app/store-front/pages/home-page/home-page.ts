import { Component } from '@angular/core';
import {ListCard} from '../../components/list-card/list-card';

@Component({
  selector: 'app-home-page',
  imports: [
    ListCard
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
