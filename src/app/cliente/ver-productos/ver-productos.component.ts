import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-ver-productos',
  imports: [CommonModule],
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.scss'],
})
export class VerProductosComponent implements OnInit {
  product: any = null;
  isLoading: boolean = true;
  error: string | null = null;
  currencyMap: { [key: string]: string } = {
    "USD": '$', // USD
    "EUR": '€', // EUR
  };
  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private userStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Get the product ID from the route
    if (productId) {
      this.fetchProductDetails(productId);
    } else {
      this.error = 'Product ID not found.';
      this.isLoading = false;
    }
  }

  navigateToAllProduct() {
    const userRole = this.userStateService.getRole();

    if (userRole === 'CLIENT') {
      this.router.navigate(['client/tienda']); // Navigate to admin profile
    }  else if (userRole === 'ADMIN') {
      this.router.navigate(['admin/tienda']); // Navigate to client profile
    }else {
      console.error(userRole," No tiene acceso"); // Handle unknown roles
      this.popupService.showMessage('Error', `${userRole}, No tiene acceso. ` , 'error');
    }
  }

  fetchProductDetails(productId: string): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch product details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching product details:', err);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}