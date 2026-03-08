import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  title: any;
  body: any;
  type: any;
  modalStatus = false;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertCreateData();
  }

  alertCreateData() {
    this.alertService.alertSettings$.subscribe((data: any) => {
      console.log(data);
      this.title = data.title;
      this.body = data.body;
      this.type = data.type;
      this.modalStatus = true;
    });
  }
  closeModal() {
    this.modalStatus = false;
  }
}
