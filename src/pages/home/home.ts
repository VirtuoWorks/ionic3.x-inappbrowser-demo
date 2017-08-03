import { Component } from '@angular/core';

import { InAppBrowserObject } from '@ionic-native/in-app-browser';

import { IabServiceProvider } from '../../providers/iab-service/iab-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private browser: InAppBrowserObject;
  private url: string;

  constructor(
    private iabService: IabServiceProvider,
  ) {
  }

  openWebpage(url?: string): void {
    const browseUrl = (url || this.url) || 'https://duckduckgo.com/';
    this.browser = this.iabService.iab.create(browseUrl, '_blank', this.iabService.iabSettings);
  }
}
