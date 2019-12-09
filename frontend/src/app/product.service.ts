import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri: 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.uri}/products`);
  }

  getProductById(id) {
    return this.http.get(`${this.uri}/products/${id}`);
  }

  addProduct(title, description, price) {
    const product = {
      title: title,
      description: description,
      price: price
    };
    return this.http.post(`${this.uri}/products/add`, product);
  }

  updateProduct(id, title, description, price, status) {
    const product = {
      title: title,
      description: description,
      price: price,
      status: status
    };
    return this.http.post(`${this.uri}/products/update/${id}`, product);
  }

  deleteProduct(id) {
    return this.http.get(`${this.uri}/products/delete/${id}`)
  }
}
