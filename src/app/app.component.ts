import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from 'primeng/api';
import { I18nService } from './i18n-service/i18n-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-application';

  items: MenuItem[] = [];
  constructor(public translate: TranslateService, private i18nService: I18nService) {
    translate.addLangs(['en', 'ta']);
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.items = [{
      label: 'Bill Generate',
      icon: 'pi pi-pw pi-file',
      routerLink: '/bill-generate'
    },
    {
      label: 'Shop Details',
      icon: 'pi pi-pw pi-file',
      routerLink: '/shop-register'
    },
    {
      label: 'Yarn Data',
      icon: 'pi pi-pw pi-file',
      routerLink: '/yarn-data'
    },
    ];
  }
  switchLang(lang: string) {
    this.i18nService.changeLocale(lang);
 }
}
