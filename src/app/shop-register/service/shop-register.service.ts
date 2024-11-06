import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  constructor(private http: HttpClient) { }
  getCustomerDetails() {
    return this.http.get('/api/getCustomerInfo');
  }
  saveCustomerDetails(customerInfo: any) {
    return this.http.post('/api/saveCustomerInfo', customerInfo);
  }
}
