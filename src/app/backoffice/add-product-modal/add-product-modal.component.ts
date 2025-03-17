import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  productForm!: FormGroup; // Add definite assignment `!`
  username: string | null = null; // Define the username variable

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
    private useStateService: UseStateService, // Inject UseStateService
    private popupService: PopupService // Inject PopupService
  ) {}

  ngOnInit(): void {
    this.username = this.useStateService.getUsername(); // Retrieve the username
    if (!this.username) {
      console.error('Username not found in session storage.');
      return;
    }

    this.initializeForm(); // Initialize the form
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      tax: [null, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      username: [this.username, Validators.required] // Use the username variable
    });
  }

  submit() {
    if (this.productForm.invalid) return;
  
    const productData = this.productForm.value;
  
    // Show loading popup
    this.popupService.loader("Guardando producto...", "Espere un momento");
  
    this.productService.addProduct(productData).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        
        this.popupService.close();
        this.popupService.showMessage('Éxito', 'Producto agregado exitosamente', 'success');
  
        setTimeout(() => {
          this.activeModal.close(productData);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        
        this.popupService.close();
  
        let message;
        if (error.status === 401) {
          message = "No autorizado. Por favor, inicie sesión nuevamente.";
        } else if (error.status === 400) {
          message = "Datos inválidos. Revise los campos e inténtelo de nuevo.";
        } else {
          message = "Ocurrió un error inesperado. Inténtelo de nuevo más tarde.";
        }
  
        this.popupService.showMessage('Error', message, 'error');
      }
    });
  }

  dismiss() {
    this.activeModal.dismiss('Closed without saving');
  }
}