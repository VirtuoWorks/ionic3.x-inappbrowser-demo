import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

import { InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { IabServiceProvider } from '../../providers/iab-service/iab-service';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  private browser: InAppBrowserObject;
  private log: string[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private iabService: IabServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.log = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  openHiddenBrowser() {
    let loader = this.loadingCtrl.create({
      content: 'Loading webpage in the background'
    });
    loader.present().then(() => {
      const originalHidden = this.iabService.iabSettings.hidden; // save current state of the hidden property
      this.iabService.iabSettings.hidden = 'yes';
      const url: string = 'https://www.duckduckgo.com/';
      this.browser = this.iabService.iab.create(url, '_blank', this.iabService.iabSettings);
      this.iabService.iabSettings.hidden = originalHidden; // restore original value
      this.browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
        this.pushLog('<b>' + event.type + '</b> event fired');
      });
      this.browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {
        loader.dismiss();
        this.pushLog('<b>' + event.type + '</b> event fired');
        this.browser.show();
      });
      this.browser.on('loaderror').subscribe((event: InAppBrowserEvent) => {
        this.pushLog('<b>' + event.type + '</b> event fired');
      });
      this.browser.on('exit').subscribe((event: InAppBrowserEvent) => {
        this.pushLog('<b>' + event.type + '</b> event fired');
      });
    });
  }

  pushLog(str: string): void {
    this.log.push(str);
    this.cdRef.detectChanges();
  }
}
