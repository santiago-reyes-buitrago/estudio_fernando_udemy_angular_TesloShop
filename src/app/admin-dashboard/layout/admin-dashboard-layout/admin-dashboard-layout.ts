import {Component, computed, inject} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';

interface RoutesAdminOptions {
  title: string;
  link: string;
  subtitle?: string;
}

const sidebarsOptions: RoutesAdminOptions[] = [
  {link: '/admin/products', title: 'Productos'},
  {link: '/admin/product/:id', title: 'Producto'}
]

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './admin-dashboard-layout.html',
  styleUrl: './admin-dashboard-layout.css'
})
export class AdminDashboardLayout {
  protected authService = inject(AuthService);
  user = computed(() => this.authService.user());
  protected readonly sidebarsOptions = sidebarsOptions;
}
