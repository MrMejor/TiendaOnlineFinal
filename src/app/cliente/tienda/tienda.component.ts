import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-tienda',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent {
  products: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currencyMap: { [key: string]: string } = {
    "USD": '$', // USD
    "EUR": '€', // EUR
  };


  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private userStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch products. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching products:', err);
      },
    });
  }
    // Navigate to the ver-productos component with the product ID
  viewProduct(product: any): void {
    const userRole = this.userStateService.getRole();

    if (userRole === 'CLIENT') {
      this.router.navigate(['client/ver-productos', product.id]); // Navigate to admin profile
    }  else if (userRole === 'ADMIN') {
      this.router.navigate(['admin/ver-productos', product.id]); // Navigate to client profile
    }else {
      console.error(userRole," No tiene acceso"); // Handle unknown roles
      this.popupService.showMessage('Error', `${userRole}, No tiene acceso. ` , 'error');
    }
  }
  
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
