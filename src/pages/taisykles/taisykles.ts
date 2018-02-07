import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmitProvider } from '../../providers/submit/submit';
// import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';


/**
* Generated class for the TaisyklesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

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
    this.sumbitProvider.sendByPost(this.form);
    console.log(this.form);

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
      
      this.availableDays.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: 'Blue' + element.id ,
          value: 'blue'
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