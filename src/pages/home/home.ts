import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InAppBrowserObject } from '@ionic-native/in-app-browser';

import { IabServiceProvider } from '../../providers/iab-service/iab-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private browser: InAppBrowserObject;
  private homeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private iabService: IabServiceProvider
  ) {
    this.homeForm = this.formBuilder.group({
      url: ['https://', Validators.required],
    });
  }

  openWebpage(url: string): void {
    if (url !== '') {
      this.browser = this.iabService.iab.create(url, '_blank', this.iabService.iabSettings);
    } else {
      // display alert
    }
  }

  checkInput() {
    if (this.homeForm.value.url !== '') {
      this.openWebpage(this.homeForm.value.url);
    }
  }

}
