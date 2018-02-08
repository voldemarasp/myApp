import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmitProvider } from '../../providers/submit/submit';

import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-taisykles',
  templateUrl: 'taisykles.html',
})
export class TaisyklesPage {
  form = {};
  availableDays:any;
  
  testRadioOpen: boolean;
  testRadioResult;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private sumbitProvider: SubmitProvider, 
    public alertCtrl: AlertController
  ) {
    this.sumbitProvider.getDaysFromProvider().subscribe(
      gautaInfo => { this.availableDays = gautaInfo },
      err => { console.log(err) }
    );
  }
  
  ionViewDidLoad() {
  }
  
  formSubmit() {
    const postDataFormat = Object.keys(this.form).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.form[key]);
    }).join('&');
    this.sumbitProvider.sendByPost(postDataFormat);
  }
  
  getDays() {
    this.sumbitProvider.getDaysFromProvider()
    .subscribe(
      res => this.availableDays = res , // success path
      error => console.log('error'), // error path,
      () => console.log(this.availableDays)
    );
  }
  
  doRadio() {
    if (typeof this.testRadioResult == 'undefined') {
   
      let alert = this.alertCtrl.create();
      alert.setTitle('Lightsaber color');
      
      this.availableDays.pirmas.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: 'Pirmas ' + element.reisas + ' // '+ element.statusas,
          value: element.reisas
        });
      });    
      
      this.availableDays.antras.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: 'Antras ' + element.reisas + ' // '+ element.statusas,
          value: element.reisas
        });
      });    
      
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: data => {
          console.log('Radio data:', data);
          this.testRadioOpen = false;
          this.testRadioResult = data;
          this.form['day'] = data;
        }
      });
      
      alert.present().then(() => {
        this.testRadioOpen = true;
      });
    } else {
      console.log(this.testRadioResult);
    }
  }
}