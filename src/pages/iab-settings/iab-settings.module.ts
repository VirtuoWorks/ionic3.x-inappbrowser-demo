import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IabSettingsPage } from './iab-settings';

@NgModule({
  declarations: [
    IabSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(IabSettingsPage),
  ],
})
export class IabSettingsPageModule {}
