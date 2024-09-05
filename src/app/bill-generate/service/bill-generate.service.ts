import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillGenerateService {

  constructor(private http: HttpClient) { }

  getCustomerDetails() {
    return this.http.get('/api/getCustomerInfo');
  }
  getBillDetails(currentYear: any) {
    return this.http.get('/api/getBillInfo?currentYear=' + currentYear);
  }
  saveBillDetails(billInfo: any) {
    return this.http.post('/api/saveBillInfo', billInfo);
  }
  deleteBillDetails(billInfo: any) {
    return this.http.post('/api/deleteBillInfo', billInfo);
  }
}
