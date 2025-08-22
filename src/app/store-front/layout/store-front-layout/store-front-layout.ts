import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../components/navbar/navbar';

@Component({
  selector: 'app-store-front-layout',
  imports: [
    RouterOutlet,
    Navbar
  ],
  templateUrl: './store-front-layout.html',
  styleUrl: './store-front-layout.css'
})
export class StoreFrontLayout {

}
