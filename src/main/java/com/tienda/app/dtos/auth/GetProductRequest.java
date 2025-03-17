/**
 * Author: jashanjeetsingh
 * Created on 14/3/25 at 00:03
 * What we did in this class :-
 * // The changes are:
 */
package com.tienda.app.dtos.auth;
import com.tienda.app.enums.Currency;

import java.math.BigDecimal;
public class GetProductRequest {
  private Long id;
  private String name;
  private String description;
  private BigDecimal price;
  private String sellerUsername; // Add seller's username Added this for fetching all products data
  private String image;
  private Currency currency;
  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice( BigDecimal price ) {
    this.price = price;
  }

  public String getSellerUsername()
  {
    return sellerUsername;
  }
  public void setSellerUsername( String sellerUsername )
  {
    this.sellerUsername = sellerUsername;
  }

  public String getImage()
  {
    return image;
  }
  public void setImage( String image )
  {
    this.image = image;
  }

  public Currency getCurrency()
  {
    return currency;
  }
  public void setCurrency( Currency currency )
  {
    this.currency = currency;
  }
}


