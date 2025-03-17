import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any[] = []; // Array to hold cart items
  totals: { [key: string]: number } = {}; // Object to hold totals for each currency

  // Currency map for formatting prices
  currencyMap: { [key: string]: string } = {
    USD: '$', 
    EUR: '€', 
    // Add more currencies as needed
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private userStateService: UseStateService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    // Subscribe to cart changes
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.calculateTotals(); // Recalculate totals whenever the cart changes
    });
  }

  increaseQuantity(productId: number) {
    const product = this.cart.find((p) => p.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, product.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const product = this.cart.find((p) => p.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, product.quantity - 1);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  calculateTotals() {
    this.totals = {}; // Reset totals

    this.cart.forEach((product) => {
      const price = Number(product.price) || 0;
      const quantity = Number(product.quantity) || 0;
      const currency = product.currency || 'USD';

      if (!this.totals[currency]) {
        this.totals[currency] = 0;
      }
      this.totals[currency] += price * quantity;
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  // Helper method to get currency symbol
  getCurrencySymbol(currencyCode: string): string {
    return this.currencyMap[currencyCode] || currencyCode; // Fallback to currency code if symbol not found
  }

  // Helper method to get currencies in the cart
  getCurrencies(): string[] {
    return Object.keys(this.totals);
  }

  // Helper method to check if a currency is the last in the list
  isLastCurrency(currency: string): boolean {
    const currencies = this.getCurrencies();
    return currencies.indexOf(currency) === currencies.length - 1;
  }
  navigateToAllProducto() {
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
  navigateToPagar() {
    const userRole = this.userStateService.getRole();

    if (userRole === 'CLIENT') {
      this.router.navigate(['client/forma-pago']); // Navigate to admin profile
    }  else if (userRole === 'ADMIN') {
      this.router.navigate(['admin/forma-pago']); // Navigate to client profile
    }else {
      console.error(userRole," No tiene acceso"); // Handle unknown roles
      this.popupService.showMessage('Error', `${userRole}, No tiene acceso. ` , 'error');
    }
  }
}