import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath = 'http://localhost:3000/productList/';

  constructor(private http: HttpClient) { }

  postProduct(data: any){
    return this.http.post<any>(this.basePath, data);
  }

  getProduct(){
    return this.http.get<any>(this.basePath);
  }

  getProductById(id: number){
    return this.http.get<any>(this.basePath + id);
  }

  updateProduct(id: number, data: any){
    return this.http.put<any>(this.basePath + id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.basePath + id);
  }
}
