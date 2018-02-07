import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmitProvider } from '../../providers/submit/submit';
// import { Observable } from 'rxjs/Observable';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sumbitProvider: SubmitProvider) {
    this.sumbitProvider.getDaysFromProvider().subscribe(
      gautaInfo => { this.availableDays = gautaInfo },
      err => { console.log(err) }
    );

  }

  ionViewDidLoad() {

  }

  echoAvailableDays(callback) 
  {
    return callback;
  }
  
  echoAvailable(callback) {
    console.log(this.availableDays);
    return callback;
  }
  
  formSubmit() {
    // console.log('Form submitted');
    // console.log(this.form);
    this.sumbitProvider.sendByPost(this.form);
    console.log("post is done");
  }

  getDays() {
    this.sumbitProvider.getDaysFromProvider()
      .subscribe(
        res => this.availableDays = res , // success path
        error => console.log('error'), // error path,
      () => console.log(this.availableDays)
      );

  }


}
