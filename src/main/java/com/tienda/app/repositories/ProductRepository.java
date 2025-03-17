package com.tienda.app.repositories;

import com.tienda.app.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  // Fetch products by seller's username
  List<Product> findBySellerUsername(String username);
}
