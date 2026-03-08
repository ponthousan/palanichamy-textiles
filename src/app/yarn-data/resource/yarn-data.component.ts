import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-yarn-data',
  templateUrl: './yarn-data.component.html',
  styleUrls: ['./yarn-data.component.scss']
})
export class YarnDataComponent implements OnInit {

  yarnData: any = [];
  totalWeight: any = 0;
  totalCone: any = 0;
  grossWeight = 0;
  coneWeight = 0;
  constructor(private fb: FormBuilder) {}

  yarnDataForm = this.fb.group({
    yarnId: [''],
    weight: [''],
    cone: ['']
  })
  ngOnInit() {
    console.log('hello');
  }
  saveYarnDetails() {
    this.yarnData.push(this.yarnDataForm.value);
    this.totalWeight = 0;
    this.totalCone = 0;
    this.yarnData.forEach((value: any, key: any) => {
      this.totalWeight += Number(value.weight);
      this.totalCone += Number(value.cone);
      value['yarnId'] = key + 1;
    })
    this.grossWeight = (this.totalWeight - ((this.totalCone * (this.coneWeight/1000)) + (0.2 * this.yarnData.length)));
  }
}
