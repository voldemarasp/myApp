import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaisyklesPage } from './taisykles';

import { SubmitProvider } from '../../providers/submit/submit';

@NgModule({
  declarations: [
    TaisyklesPage,
  ],
  imports: [
    IonicPageModule.forChild(TaisyklesPage)
  ],
  providers: [
    SubmitProvider
  ]
})
export class TaisyklesPageModule {}
