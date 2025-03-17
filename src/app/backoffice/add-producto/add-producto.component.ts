import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { ProductService } from '../../services/product.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-add-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss']
})
export class AddProductoComponent {
  existingProducts: any[] = [];

    // Currency map for formatting prices
    currencyMap: { [key: string]: string } = {
      USD: 'USD',
      EUR: 'EUR',
    };

  constructor(
    private modalService: NgbModal, 
    private productService: ProductService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {}

  openAddProductModal() {
    const modalRef = this.modalService.open(AddProductModalComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  
    modalRef.result.then((product) => {
      if (product) {
        console.log('New product added:', product);
        this.fetchExistingProducts(); // Refresh product list
      }
    }).catch(() => {
      console.log('Modal closed without saving');
    });
  }
  
  ngOnInit(): void {
    this.fetchExistingProducts(); // Fetch existing products when the component initializes
  }

  fetchExistingProducts() {
    const username = this.useStateService.getUsername();
    if (username) {
      this.productService.getProductsByUser(username).subscribe(
        (response) => {
          console.log('Products fetched:', response); // Log the response
          this.existingProducts = response;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  // add-producto.component.ts

deleteProduct(productId: string) {
  this.productService.deleteProduct(productId).subscribe(
    (response) => {
      console.log('Product deleted:', response);
      this.fetchExistingProducts(); // Refresh the product list after deletion
    },
    (error) => {
      console.error('Error deleting product:', error);
    }
  );
}
  
deleteProductWithConfirmation(productId: string): void {
  this.popupService
    .showConfirmationWithActions(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?'
    )
    .then((confirmed) => {
      if (confirmed) {
        // User clicked "Seguro"
        this.popupService.loader('Eliminando producto', 'Por favor espera...');

        // Call the product service to delete the product
        this.productService.deleteProduct(productId).subscribe(
          (response) => {
            console.log('Product deleted:', response);
            this.popupService.close();
            this.fetchExistingProducts();
          },
          (error) => {
            console.error('Error deleting product:', error);
            this.popupService.close();
            this.popupService.showMessage('Error', 'No se pudo eliminar el producto.'); // Show error message
          }
        );
      } else {
        // User clicked "Cancelar"
        console.log('Product deletion canceled.'); // Optional: Add a log or other action
      }
    });
}
}
