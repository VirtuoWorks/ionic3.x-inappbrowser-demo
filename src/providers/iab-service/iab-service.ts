import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Injectable()
export class IabServiceProvider {
  public iabSettings: InAppBrowserOptions;

  constructor(
    public iab: InAppBrowser,
    public modalCtrl: ModalController
  ) {
    console.log('Hello IabServiceProvider constructor');
    this.loadDefaultSettings();
  }

  public getDefaultSettings(): InAppBrowserOptions {
    return {
      location: 'yes',
      zoom: 'yes',
      hardwareback: 'yes',
      toolbar: 'yes',
      keyboardDisplayRequiresUserAction: 'yes',
      presentationstyle: 'fullscreen',
      transitionstyle: 'coververtical',
      toolbarposition: 'bottom',
      closebuttoncaption: 'DONE'
    };
  }

  public loadDefaultSettings(): void {
    this.iabSettings = this.getDefaultSettings();
  }

  public applySettingsFormData(formData: any): void {
    this.iabSettings = {};

    // Common properties
    this.iabSettings.location = (formData.location === true) ? 'yes' : 'no';
    this.iabSettings.hidden = (formData.hidden === true) ? 'yes' : 'no';
    if (formData.clearcache === true) {
      this.iabSettings.clearcache = 'yes';
    }
    if (formData.clearsessioncache === true) {
      this.iabSettings.clearsessioncache = 'yes';
    }
    this.iabSettings.hardwareback = (formData.hardwareback === true) ? 'yes' : 'no';
    this.iabSettings.mediaPlaybackRequiresUserAction = (formData.mediaPlaybackRequiresUserAction === true) ? 'yes' : 'no';

    // Android Only properties
    this.iabSettings.zoom = (formData.zoom === true) ? 'yes' : 'no';
    this.iabSettings.shouldPauseOnSuspend = (formData.shouldPauseOnSuspend === true) ? 'yes' : 'no';

    // iOS Only properties
    this.iabSettings.closebuttoncaption = formData.closebuttoncaption;
    this.iabSettings.disallowoverscroll = (formData.disallowoverscroll === true) ? 'yes' : 'no';
    this.iabSettings.toolbar = (formData.toolbar === true) ? 'yes' : 'no';
    this.iabSettings.enableViewportScale = (formData.enableViewportScale === true) ? 'yes' : 'no';
    this.iabSettings.allowInlineMediaPlayback = (formData.allowInlineMediaPlayback === true) ? 'yes' : 'no';
    this.iabSettings.keyboardDisplayRequiresUserAction = (formData.keyboardDisplayRequiresUserAction === true) ? 'yes' : 'no';
    this.iabSettings.suppressesIncrementalRendering = (formData.suppressesIncrementalRendering === true) ? 'yes' : 'no';
    this.iabSettings.presentationstyle = formData.presentationstyle;
    this.iabSettings.transitionstyle = formData.transitionstyle;
    this.iabSettings.toolbarposition = formData.toolbarposition;

    // Windows Only properties
    if (formData.fullscreen === true) {
      this.iabSettings.fullscreen = 'yes';
    }
  }

  openSettings(): void {
    const settingsModal = this.modalCtrl.create('IabSettingsPage');
    settingsModal.onDidDismiss((data?) => {
      if (data !== undefined) {
        console.log('Settings modal was dismissed, got data: ', data);
        this.applySettingsFormData(data);
      }
    });
    settingsModal.present();
  }

}
