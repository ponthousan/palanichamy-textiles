import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RegisterFormService } from '../service/register-form.service'
import { I18nService } from 'src/app/i18n-service/i18n-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  searchMoviesCtrl = new FormControl();
  editCustomer = false;
  filteredMovies: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  getCustomerData: any = [];
  selectedMovie: any = "";
  constructor(private fb: FormBuilder,public translate: TranslateService, private i18nService: I18nService, private registerService: RegisterFormService
    ) {
    translate.addLangs(['en', 'ta']);
    translate.setDefaultLang('en');
   }

  shopDetailsForm = this.fb.group({
    shopId: [''],
    shopName: ['', [Validators.required]],
    shopGstNo: ['', [Validators.required]],
    shopAddress1: ['', [Validators.required]],
    shopAddress2: [''],
    shopCity: ['', [Validators.required]],
    shopPincode: ['', [Validators.required]],
    shopDistrict: ['', [Validators.required]],
    shopState: ['', [Validators.required]],
  })

  ngOnInit() {
    this.getCustomerDetails();
    this.i18nService.localeEvent.subscribe((locale) => this.translate.use(locale))
  }

  get f() {
    return this.shopDetailsForm.controls;
  }
  getCustomerDetails() {
    this.registerService.getCustomerDetails().subscribe(response => {
      this.getCustomerData = response;
      console.log(response);
    }, error => {
      console.log('error')
    });
  }
  saveCustomerDetails() {
    const saveCustomerDetails = {
      'customerId': (this.editCustomer == true) ? this.shopDetailsForm.controls['shopId'].value : '',
      "customerName": this.shopDetailsForm.controls['shopName'].value,
      "gstno": this.shopDetailsForm.controls['shopGstNo'].value,
      "address1": this.shopDetailsForm.controls['shopAddress1'].value,
      "address2": this.shopDetailsForm.controls['shopAddress2'].value,
      "city": this.shopDetailsForm.controls['shopCity'].value,
      "pincode": this.shopDetailsForm.controls['shopPincode'].value,
      "district": this.shopDetailsForm.controls['shopDistrict'].value,
      "state": this.shopDetailsForm.controls['shopState'].value,
    }
    console.log(saveCustomerDetails);
    this.registerService.saveCustomerDetails(saveCustomerDetails).subscribe((response) => {
      this.editCustomer = false;
      console.log('saved successfully');
    })
  }
  editShopData(data: any) {
    this.editCustomer = true;
    this.shopDetailsForm.setValue({
      shopId: data.customer_id,
      shopName: data.customer_name,
      shopGstNo: data.customer_gst_no,
      shopAddress1: data.customer_address1,
      shopAddress2: data.customer_address2,
      shopCity: data.customer_city,
      shopPincode: data.customer_pincode,
      shopDistrict: data.customer_district,
      shopState: data.customer_state,
    })
  }
}
