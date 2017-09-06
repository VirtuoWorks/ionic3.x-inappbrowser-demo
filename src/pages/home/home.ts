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
  private targets: string[] = ['_blank', '_self', '_system'];

  constructor(
    private formBuilder: FormBuilder,
    private iabService: IabServiceProvider
  ) {
    this.homeForm = this.formBuilder.group({
      url: ['https://', Validators.required],
      target: ['_blank', Validators.required]
    });
  }

  openWebpage(url: string, target?: string): void {
    let iabTarget: string;
    if (url !== '') {
      switch (target) {
        case '_self':
        case '_system':
          iabTarget = target;
          break;
        default:
        iabTarget = '_blank';
      }
      this.browser = this.iabService.iab.create(url, iabTarget, this.iabService.iabSettings);
    } else {
      // display alert
    }
  }

  checkInput(target: string): void {
    if (this.homeForm.value.url !== '') {
      this.openWebpage(this.homeForm.value.url, this.homeForm.value.target);
    }
  }

}
