/**
 * Author: jashanjeetsingh
 * Created on 12/3/25 at 23:05
 * What we did in this class :-
 * // The changes are:
 */
package com.tienda.app.controllers;

import com.tienda.app.dtos.auth.AddProductRequest;
import com.tienda.app.dtos.auth.GetProductRequest;
import com.tienda.app.enums.Currency;
import com.tienda.app.models.Product;
import com.tienda.app.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  // Add a new product
  @PostMapping("/create")
  public ResponseEntity<String> addProduct(@RequestBody AddProductRequest request) {
    if (request.getImage() == null || request.getImage().isEmpty()) {
      request.setImage(null);
    }
    if (request.getPrice() == null) {
      request.setPrice( BigDecimal.ZERO);
    }
    if (request.getTax() == null) {
      request.setTax(0.0);
    }
    if (request.getCurrency() == null) {
      request.setCurrency( Currency.EUR);
    }
    productService.saveProduct(request);
    return ResponseEntity.ok("Producto agregado exitosamente");
  }

  // Fetch products by user (seller)
  @GetMapping("/users/{username}")
  public ResponseEntity<List<GetProductRequest>> getProductsByUser(@PathVariable String username) {
    List<GetProductRequest> productDTOs = productService.getProductsByUser(username); // Call the service method
    return ResponseEntity.ok(productDTOs); // Return the list of DTOs
  }

  // ProductController.java
  @GetMapping
  public ResponseEntity<List<GetProductRequest>> getAllProducts() {
    List<GetProductRequest> productDTOs = productService.getAllProducts(); // Call the service method
    return ResponseEntity.ok(productDTOs); // Return the list of DTOs
  }
  // ProductController.java
  @GetMapping("/{id}")
  public ResponseEntity<GetProductRequest> getProductById(@PathVariable Long id) {
    GetProductRequest productDTO = productService.getProductById(id); // Fetch the product by ID
    return ResponseEntity.ok(productDTO); // Return the product DTO
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteProductById(@PathVariable Long id) {
    try {
      productService.deleteProductById(id); // Call the service to delete the product
      return ResponseEntity.ok("Product deleted successfully"); // Return a success message
    } catch (Exception e) {
      return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product: " + e.getMessage());
    }
  }
}


