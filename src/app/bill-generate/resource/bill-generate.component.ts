import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/i18n-service/i18n-service.service';
import { BillGenerateService } from '../service/bill-generate.service';
import { DatePipe, formatDate } from '@angular/common';

import { NumberToWordsPipe } from '../../pipe/number-to-words.pipe';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertService } from '../../alert-service/service/alert.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss'],
  providers: [DatePipe, NumberToWordsPipe]
})
  export class BillGenerateComponent implements OnInit {
  getCustomerData:any = [];
  totalvalue = 0;
  url = '';
  // hxncode = '5205'
  // taxpercenatage = '2.5'
  hxncode = '55095300'
  taxpercenatage = 5;
  sgtcgt = this.taxpercenatage/2;
  vehicleno = 'TN 49 L 2160'
  // vehicleno = 'TN 76 AF 4359'
  gstvaluefind: any;
  getBillData:any = [];
  bsInlineValue = new Date();
  today: Date;
  maxDate = new Date();
  startYear = 2021;
  endYear = 2050;
  yearValue = '';
  selectedYear:any = [];
  currentTime = new Date();
  currentYear: any;
  constructor(private fb: UntypedFormBuilder, private billGenerateService: BillGenerateService, public translate: TranslateService, private i18nService: I18nService, private datePipe: DatePipe, private numberToWords: NumberToWordsPipe, private alertService: AlertService) {
    this.today = new Date();
    // this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), 25);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    translate.addLangs(['en', 'ta']);
    translate.setDefaultLang('en');
  }
  editBillInfo = false;
  billGenerateForm = this.fb.group({
    customer_bill_id: [''],
    customer_bill_no: ['', [Validators.required]],
    customer_gst_no: ['', [Validators.required]],
    customer_mode_transport: [1, [Validators.required]],
    customer_vehicle_no: [this.vehicleno],
    customer_bill_date: ['', [Validators.required]],
    amountDescription: this.fb.array([]),
  })
  ngOnInit(): void {
    this.url = 'http://localhost:4200';
    const currentMonth = this.currentTime.getMonth() + 1;
    if (currentMonth >= 4) {
      this.currentYear = this.currentTime.getFullYear();
    } else {
      this.currentYear = Number(this.currentTime.getFullYear()) - Number(1);
    }
    this.addAmountDesc();
    this.getCustomerDetails();
    this.getBillDetails(this.currentYear);
    this.selectYear();
    this.i18nService.localeEvent.subscribe((locale) => this.translate.use(locale))
  }

  get f() {
    return this.billGenerateForm.controls;
  }
  get amountDescGroups(): UntypedFormArray {
    return this.billGenerateForm.get('amountDescription') as UntypedFormArray;
  }

  showAlert() {
    this.alertService.create('Save', 'You have successfully inserted data', 'success');
  }
  selectYear() {
    for (let i = this.startYear; i < this.endYear; i++) {
      this.yearValue = (i + '-' + (Number(i) + Number(1)));
      this.selectedYear.push({name: this.yearValue, code: i});
    }
    console.log(this.selectedYear);
  }
  newAmountDesc(): UntypedFormGroup {
    return this.fb.group({
      customer_description: ['CORDED COTTON CONE', [Validators.required]],
      customer_no_of_bag: ['', [Validators.required]],
      customer_hsn_code: ['5205', [Validators.required]],
      customer_weight: ['', [Validators.required]],
      customer_rate: ['', [Validators.required]],
    })
  }

  addAmountDesc() {
    this.amountDescGroups.push(this.newAmountDesc());
  }
  removeAmountDesc(i: number) {
    this.amountDescGroups.removeAt(i);
  }
  getCustomerDetails() {
    this.billGenerateService.getCustomerDetails().subscribe(response => {
      this.getCustomerData = response;
    });
  }
  getBillDetails(currentYear: any) {
    this.billGenerateService.getBillDetails(currentYear).subscribe(response => {
      this.getBillData = response;
      this.getBillData.forEach((data: any) => {
        data.customer_name = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_name'];
        data.customer_address1 = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_address1'];
        data.customer_city = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_city'];
        data.customer_district = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_district'];
        data.customer_state = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_state'];
        data.customer_pincode = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_pincode'];
        data.customer_pincode = this.getCustomerData.find((x: any) => x.customer_gst_no == data.customer_gst_no)['customer_pincode'];
      })
    });
  }
  saveBillDetails() {
    const saveBillDetails = {
      'customer_bill_id': (this.editBillInfo == true) ? this.billGenerateForm.controls['customer_bill_id'].value : '',
      "customer_bill_no": this.billGenerateForm.controls['customer_bill_no'].value,
      "customer_gst_no": this.billGenerateForm.controls['customer_gst_no'].value,
      "customer_mode_transport": this.billGenerateForm.controls['customer_mode_transport'].value,
      "customer_vehicle_no": this.billGenerateForm.controls['customer_vehicle_no'].value,
      "customer_bill_date": this.billGenerateForm.controls['customer_bill_date'].value,
      "customer_description": "",
      "customer_no_of_bag": "",
      "customer_hsn_code": "",
      "customer_rate": "",
      "customer_weight": "",
      "customer_create_date": this.billGenerateForm.controls['customer_bill_date'].value,
      "customer_updated_date": formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    }
    this.billGenerateForm.get('amountDescription')?.value.forEach((descData: any) => {
      saveBillDetails['customer_description'] += descData.customer_description + ','
      saveBillDetails['customer_no_of_bag'] += descData.customer_no_of_bag + ','
      saveBillDetails['customer_hsn_code'] += descData.customer_hsn_code + ','
      saveBillDetails['customer_rate'] += descData.customer_rate + ','
      saveBillDetails['customer_weight'] += descData.customer_weight + ','
    })
    saveBillDetails['customer_description'] = saveBillDetails['customer_description'].slice(0, -1);
    saveBillDetails['customer_no_of_bag'] = saveBillDetails['customer_no_of_bag'].slice(0, -1);
    saveBillDetails['customer_hsn_code'] = saveBillDetails['customer_hsn_code'].slice(0, -1);
    saveBillDetails['customer_rate'] = saveBillDetails['customer_rate'].slice(0, -1);
    saveBillDetails['customer_weight'] = saveBillDetails['customer_weight'].slice(0, -1);
    this.billGenerateService.saveBillDetails(saveBillDetails).subscribe(response => {
      this.alertService.create('Save', 'You have successfully saved data', 'success');
      this.editBillInfo = false;
      this.getBillDetails(this.currentYear);
    })
  }
  changeWeight(event: any) {
    this.amountDescGroups.value[0].customer_weight = event.target.value * 45;
  }
  editBillData(data: any) {
    this.editBillInfo = true;
    const items = (<UntypedFormArray>this.billGenerateForm.get('amountDescription'));
    for (let i = 0; i < items.length; i++) {
        items.removeAt(i);
    }
    const descriptionUpdate = data.customer_description ? data.customer_description.split(',') : '';
    const noofbagUpdate = data.customer_no_of_bag ? data.customer_no_of_bag.split(',') : '';
    const hsncodeUpdate = data.customer_hsn_code ? data.customer_hsn_code.split(',') : '';
    const weightUpdate = data.customer_weight ? data.customer_weight.split(',') : '';
    const rateUpdate = data.customer_rate ? data.customer_rate.split(',') : '';
    let amountDescUpdate;
    if (descriptionUpdate.length > 0) {
      for (let j=0; j<=descriptionUpdate.length-1;j++) {
        amountDescUpdate = this.amountDescGroups.push(this.fb.group({
          customer_description: [descriptionUpdate[j], [Validators.required]],
          customer_no_of_bag: [noofbagUpdate[j], [Validators.required]],
          customer_hsn_code: [hsncodeUpdate[j], [Validators.required]],
          customer_weight: [weightUpdate[j], [Validators.required]],
          customer_rate: [rateUpdate[j], [Validators.required]],
        }));
      }
    } else {
      amountDescUpdate = this.amountDescGroups.push(this.fb.group({
        customer_description: [data.customer_description, [Validators.required]],
        customer_no_of_bag: [data.customer_no_of_bag, [Validators.required]],
        customer_hsn_code: [data.customer_hsn_code, [Validators.required]],
        customer_weight: [data.customer_weight, [Validators.required]],
        customer_rate: [data.customer_rate, [Validators.required]],
      }))
    }
    console.log(amountDescUpdate);
    this.billGenerateForm.patchValue({
      customer_bill_id: data.customer_bill_id,
      customer_bill_no: data.customer_bill_no,
      customer_gst_no: data.customer_gst_no,
      customer_mode_transport: data.customer_mode_transport,
      customer_vehicle_no: data.customer_vehicle_no,
      customer_bill_date: formatDate(data.customer_bill_date, 'yyyy-MM-dd', 'en'),
      amountDescription: amountDescUpdate
    })
  }
  deleteBillData(data: any) {
    console.log('deleted successuflly')
    data['deleted_flag']='true';
    this.billGenerateService.deleteBillDetails(data).subscribe(response => {
      this.alertService.create('Save', 'You have deleted saved data', 'success');
      this.getBillDetails(this.currentYear);
    })
  }
  exportAsPDF(pdfOption: any, pdfData: any) {
    const serialno = pdfData.customer_bill_no;
    const modetransport = (pdfData.customer_mode_transport == 1) ? 'VAN' : (pdfData.customer_mode_transport == 2) ? 'Jeyavilas' : (pdfData.customer_mode_transport == 3) ? 'TRMS LORRY' : 'VAN';
    const vehicleNo = (pdfData.customer_mode_transport == 1) ? this.vehicleno : '..............................';
    const billdate = pdfData.customer_bill_date;
    const noofbag = pdfData.customer_no_of_bag;
    const description = pdfData.customer_description;
    const hsnCode = '5205'
    const unit = pdfData.customer_weight;
    const rate = pdfData.customer_rate;
    const billNewdate = this.datePipe.transform(billdate, 'dd.MM.y');
    const rowLengthData = description.split(',');
    const descriptionData = description.split(',');
    const unitData = unit.split(',');
    const rateData = rate.split(',');
    // const hsnCode = hsncodeData.split(',');
    const noofbagData = noofbag.split(',');
    pdfData.customerAddress2 = (pdfData.customerAddress2) ? pdfData.customerAddress2 : '';
    const shopaddress = (pdfData.customerAddress2) ? `${pdfData.customer_address1},
              ${pdfData.customerAddress2},
              ${pdfData.customer_city} - ${pdfData.customer_pincode}
              State : ${pdfData.customer_state}` : `${pdfData.customer_address1},
              ${pdfData.customer_city} - ${pdfData.customer_pincode}
              State : ${pdfData.customer_state}`;
    const titleColumn = [];
    titleColumn.push({
      text: `S. No`,
      alignment: 'center'
    },
      {
        text: `Description of Goods`,
        alignment: 'center'
      },
      {
        text: `HSN
          Code`,
        alignment: 'center'
      },
      {
        text: `No.of
          Packages`,
        alignment: 'center'
      },
      {
        text: `Qty`,
        alignment: 'center'
      },
      {
        text: `Unit`,
        alignment: 'center'
      },
      {
        text: `Rate`,
        alignment: 'center'
      },
      {
        text: `Total Taxable Value`,
        colSpan: 2,
        alignment: 'center'
      },
      {
        text: ''
      });
    const emptycolumn = [];
    emptycolumn.push({ text: ' ', margin: [5, 5, 5, 5] }, '', '', '', '', '', '', '', '');
    const dataColumn:any = [];
    this.totalvalue = 0;
    for (let i =0; i <= rowLengthData.length-1; i++) {
    this.totalvalue = Number(this.totalvalue) + Number(unitData[i] * rateData[i]);
    this.gstvaluefind = Math.round((((this.totalvalue) * this.taxpercenatage) / 100) / 2);
    rowLengthData[i];
    dataColumn.push([{
      text: i+1,
      margin: [5, 5, 5, 5]
    },
      {
        text: descriptionData[i],
        margin: [5, 5, 5, 5]
      },
      {
        text: hsnCode,
        margin: [5, 5, 5, 5]
      },
      {
        text: noofbagData[i],
        margin: [5, 5, 5, 5]
      },
      {
        text: ` `,
      },
      {
        text: unitData[i] + ' kg',
        margin: [5, 5, 5, 5]
      },
      {
        text: rateData[i],
        margin: [5, 5, 5, 5]
      },
      {
        text: Math.round((unitData[i] * rateData[i])),
        margin: [5, 5, 5, 5]
      }, { text: '00', margin: [5, 5, 5, 5] }]);
    }
    const documentDefinition = {
      content: [
        {
          style: 'tableExample',
          color: '#555',
          table: {
            body: [
              [
                [
                  {
                    columns: [{
                      text: 'GSTIN : 33BQZPP9671A1Z9'
                    },
                    [{
                      text: 'Cell: 94427 10107',
                      alignment: 'right'
                    },
                    {
                      text: '70102 46020',
                      alignment: 'right'
                    }]]
                  },
                  {
                    text: 'PALANICHAMY TEXTILES',
                    style: 'textileName'
                  },
                  {
                    text: '5/13, Uranipatti Street',
                    style: 'textileStreet'
                  },
                  {
                    text: 'SRIVILLIPUTHUR - 626125',
                    style: 'textileCity'
                  },
                  {
                    columns: [{
                      text: 'No: ' + serialno,
                      alignment: 'left'
                    }, {
                      text: 'INVOICE',
                      style: 'invoiceName'
                    }, {
                      text: 'Date:  ' + billNewdate,
                      alignment: 'right'
                    }]
                  },
                  {
                    table: {
                      body: [
                        [{
                          text: `   Details of Receiver (Billed to) details of Consignee Shipped to
                                Name: ${pdfData.customer_name}
                                Address: ${shopaddress}
                                GSTIN: ${pdfData.customer_gst_no}`,
                          lineHeight: 2,
                          colSpan: 5
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: `
                                Mode of Transport: ${modetransport}
                                Veh. No. ${vehicleNo}
                                DL & Time of Supply: ${billNewdate}
                                Place of Supply: ...........................`,
                          colSpan: 4,
                          lineHeight: 2,
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        }
                        ],
                        titleColumn,
                        dataColumn[0] ? dataColumn[0] : emptycolumn,
                        dataColumn[1] ? dataColumn[1] : emptycolumn,
                        dataColumn[2] ? dataColumn[2] : emptycolumn,
                        dataColumn[3] ? dataColumn[3] : emptycolumn,
                        dataColumn[4] ? dataColumn[4] : emptycolumn,
                        dataColumn[5] ? dataColumn[5] : emptycolumn,
                        [{
                          text: `
                              Rupees:  ` + this.numberToWords.transform(Math.round(this.totalvalue + (2 * this.gstvaluefind)))
                              .toUpperCase(),
                          colSpan: 5,
                          rowSpan: 4,
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: 'Total',
                          colSpan: 2,
                          alignment: 'right'
                        }, {
                          text: ''
                        }, {
                          text: Math.round(this.totalvalue),
                          alignment: 'right'
                        }, {
                          text: '00',
                          alignment: 'right'
                        }],
                        [{
                          text: '',
                          colSpan: 5
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: `CGST ${this.sgtcgt}%`,
                          colSpan: 2,
                          alignment: 'right'
                        }, {
                          text: ''
                        }, {
                          text: this.gstvaluefind,
                          alignment: 'right'
                        }, {
                          text: '00',
                          alignment: 'right'
                        }],
                        [{
                          text: '',
                          colSpan: 5
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: `SGST ${this.sgtcgt}%`,
                          alignment: 'right',
                          colSpan: 2
                        }, {
                          text: ''
                        }, {
                          text: this.gstvaluefind,
                          alignment: 'right'
                        }, {
                          text: '00',
                          alignment: 'right'
                        }],
                        [{
                          text: '',
                          colSpan: 5
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ' ',
                          colSpan: 2,
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }],
                        [{
                          text: 'Eway Bill No:',
                          colSpan: 5
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: ''
                        }, {
                          text: 'Invoice Total',
                          alignment: 'right',
                          colSpan: 2
                        }, {
                          text: ''
                        }, {
                          text: Math.round(this.totalvalue + (2 * this.gstvaluefind)),
                          alignment: 'right'
                        }, {
                          text: '00',
                          alignment: 'right'
                        }],
                        [{
                          text: `Certified that the Particulars given above are true and correct`,
                          colSpan: 5
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: `Electronic Reference Number :`,
                          colSpan: 4
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        }
                        ],
                        [{
                          text: `PALANICHAMY TEXTILE
                            ACC NO:  328150050800034
                            IFSC Code: TMBL0000328
                            TAMILNAD MERCANTILE BANK, SRIVILLIPUTHUR
                            E & O.E.,`,
                          colSpan: 5,
                          lineHeight: 2
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: `For PALANICHAMY TEXTILES







                            Authorized Signatory`,
                          colSpan: 4,
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        },
                        {
                          text: ''
                        }
                        ],
                      ]
                    }
                  },
                ]
              ]
            ]
          },
          layout: {
            paddingLeft: (i: any, node: any) => 5,
            paddingRight: (i: any, node: any) => 5,
            paddingTop: (i: any, node: any) => 5,
            paddingBottom: (i: any, node: any) => 5,
          }
        },
      ],
      styles: {
        textileName: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 5],
        },
        tableExample: {
          fontSize: 10,
          bold: true
        },
        textileStreet: {
          alignment: 'center'
        },
        textileCity: {
          alignment: 'center',
          margin: [0, 0, 0, 20],
          border: '1px solid #000',
        },
        invoiceName: {
          alignment: 'center',
          color: '#fff',
          background: '#000',
          border: '1px solid #000',
        }
      }
    };
    if (pdfOption == 'open') {
      (<any>pdfMake).createPdf(documentDefinition).open();
    } else {
      (<any>pdfMake).createPdf(documentDefinition).download(serialno + '.' + pdfData.customer_name + '_.pdf');
    }
  }
}
