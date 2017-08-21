import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController } from 'ionic-angular';

import { IabServiceProvider } from '../../providers/iab-service/iab-service';

@IonicPage()
@Component({
  selector: 'page-iab-settings',
  templateUrl: 'iab-settings.html',
})
export class IabSettingsPage {
  private formData: any;
  private settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private iabService: IabServiceProvider,
    private viewCtrl: ViewController
  ) {
    this.formData = [{
      header: 'Common Properties',
      icon: '',
      controls: [
        { name: 'location', type: 'toggle' },
        { name: 'hidden', type: 'toggle' },
        { name: 'clearcache', type: 'toggle' },
        { name: 'clearsessioncache', type: 'toggle' },
        { name: 'hardwareback', type: 'toggle' },
        { name: 'mediaPlaybackRequiresUserAction', type: 'toggle' }
      ]
    }, {
      header: 'Android Properties',
      icon: 'logo-android',
      controls: [
        { name: 'zoom', type: 'toggle' },
        { name: 'shouldPauseOnSuspend', type: 'toggle' }
      ]
    }, {
      header: 'iOS Properties',
      icon: 'logo-apple',
      controls: [
        { name: 'closebuttoncaption', type: 'text' },
        { name: 'disallowoverscroll', type: 'toggle' },
        { name: 'toolbar', type: 'toggle' },
        { name: 'enableViewportScale', type: 'toggle' },
        { name: 'allowInlineMediaPlayback', type: 'toggle' },
        { name: 'keyboardDisplayRequiresUserAction', type: 'toggle' },
        { name: 'suppressesIncrementalRendering', type: 'toggle' },
        { name: 'presentationstyle', type: 'select',
          options: [
            'pagesheet',
            'formsheet',
            'fullscreen'
          ]
        },
        { name: 'transitionstyle',
          type: 'select',
          options: [
            'fliphorizontal',
            'crossdissolve',
            'coververtical'
          ]
        },
        { name: 'toolbarposition',
          type: 'select',
          options: [
            'top',
            'bottom'
          ]
        }
      ]
    }, {
      header: 'Windows Properties',
      icon: 'logo-windows',
      controls: [
        { name: 'fullscreen', type: 'toggle' }
      ]
    }];

    this.createForm();
  }

  createForm(): void {
    this.settingsForm = this.formBuilder.group({
      // Common properties
      location: [(this.iabService.iabSettings.location === 'yes') ? true : false, Validators.required],
      hidden: [(this.iabService.iabSettings.hidden === 'yes') ? true : false, Validators.required],
      clearcache: [(this.iabService.iabSettings.clearcache === 'yes') ? true : false, Validators.required],
      clearsessioncache: [(this.iabService.iabSettings.clearsessioncache === 'yes') ? true : false, Validators.required],
      hardwareback: [(this.iabService.iabSettings.hardwareback === 'yes') ? true : false, Validators.required],
      mediaPlaybackRequiresUserAction: [(this.iabService.iabSettings.mediaPlaybackRequiresUserAction === 'yes') ? true : false, Validators.required],

      // Android Only properties
      zoom: [(this.iabService.iabSettings.zoom === 'yes') ? true : false, Validators.required],
      shouldPauseOnSuspend: [(this.iabService.iabSettings.shouldPauseOnSuspend === 'yes') ? true : false, Validators.required],

      // iOS Only properties
      closebuttoncaption: [this.iabService.iabSettings.closebuttoncaption],
      disallowoverscroll: [(this.iabService.iabSettings.disallowoverscroll === 'yes') ? true : false, Validators.required],
      toolbar: [(this.iabService.iabSettings.toolbar === 'yes') ? true : false, Validators.required],
      enableViewportScale: [(this.iabService.iabSettings.enableViewportScale === 'yes') ? true : false, Validators.required],
      allowInlineMediaPlayback: [(this.iabService.iabSettings.allowInlineMediaPlayback === 'yes') ? true : false, Validators.required],
      keyboardDisplayRequiresUserAction: [(this.iabService.iabSettings.keyboardDisplayRequiresUserAction === 'yes') ? true : false, Validators.required],
      suppressesIncrementalRendering: [(this.iabService.iabSettings.suppressesIncrementalRendering === 'yes') ? true : false, Validators.required],
      presentationstyle: [this.iabService.iabSettings.presentationstyle, Validators.required],
      transitionstyle: [this.iabService.iabSettings.transitionstyle, Validators.required],
      toolbarposition: [this.iabService.iabSettings.toolbarposition, Validators.required],

      // Windows Only properties
      fullscreen: [(this.iabService.iabSettings.fullscreen === 'yes') ? true : false, Validators.required]
    });
  }

  cancel(): void {
    this.viewCtrl.dismiss();
  }

  apply(): void {
    this.iabService.applySettingsFormData(this.settingsForm.value);
    this.viewCtrl.dismiss();
  }

  setDefaults() {
    this.iabService.loadDefaultSettings();
    this.createForm();
    // loadDefaultSettings();
  }
}
