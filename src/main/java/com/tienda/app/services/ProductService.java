/**
 * Author: jashanjeetsingh
 * Created on 12/3/25 at 23:06
 * What we did in this class :-
 * // The changes are:
 */
package com.tienda.app.services;

import com.tienda.app.dtos.auth.AddProductRequest;
import com.tienda.app.dtos.auth.GetProductRequest;
import com.tienda.app.models.Product;
import com.tienda.app.models.User;
import com.tienda.app.repositories.ProductRepository;
import com.tienda.app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService
{

  private final ProductRepository productRepository;
  private final UserRepository userRepository;

  public ProductService( ProductRepository productRepository , UserRepository userRepository )
  {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }

  // Fetch products by user (seller)
//  public List< Product > getProductsByUser( String username )
//  {
//    return productRepository.findBySellerUsername( username );
//  }

  // Fetch products by user (seller) and return as DTOs
  public List<GetProductRequest> getProductsByUser(String username) {
    List<Product> products = productRepository.findBySellerUsername(username); // Fetch products by seller username
    return products.stream()
        .map(this::mapToGetProductRequest) // Map each Product to GetProductRequest
        .collect( Collectors.toList()); // Collect into a List<GetProductRequest>
  }

  public void saveProduct( AddProductRequest request) {

    User user = this.userRepository.findByUsername(request.getUsername()).orElseThrow( () -> new IllegalArgumentException( "User Not Found" ) );

    Product product = new Product();
    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setImage(request.getImage());
    product.setPrice(request.getPrice());
    product.setTax(request.getTax());
    product.setCurrency(request.getCurrency());

    product.setSeller( user );

    productRepository.save(product); // Save product in DB
  }

  // Map Product entity to GetProductRequest DTO
  public GetProductRequest mapToGetProductRequest(Product product) {
    GetProductRequest dto = new GetProductRequest();
    dto.setId(product.getId());
    dto.setName(product.getName());
    dto.setDescription(product.getDescription());
    dto.setPrice(product.getPrice());
    dto.setSellerUsername(product.getSeller().getUsername()); // Add seller's username
    dto.setImage(product.getImage());
    dto.setCurrency(product.getCurrency());
    return dto;
  }

  // ProductService.java
  public List<GetProductRequest> getAllProducts() {
    List<Product> products = productRepository.findAll(); // Fetch all products from the database
    return products.stream()
        .map(this::mapToGetProductRequest) // Map each Product to GetProductRequest
        .collect(Collectors.toList()); // Collect into a List<GetProductRequest>
  }

  public GetProductRequest getProductById(Long productId) {
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new IllegalArgumentException("Product not found")); // Handle case where product is not found
    return mapToGetProductRequest(product); // Map the product to GetProductRequest DTO
  }

  // Delete Product
  public void deleteProductById(Long id) {
    // Perform the deletion logic here
    // For example, if you're using a repository:
    productRepository.deleteById(id);
  }
}


