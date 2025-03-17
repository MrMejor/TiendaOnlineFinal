import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}
  navigateToRegister() {
    this.router.navigate(['/registro']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}