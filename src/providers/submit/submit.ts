import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class SubmitProvider {
  result;
  configUrl = 'http://app.valdema.lt/api/';

  constructor(public http: HttpClient) {
    console.log('Hello SubmitProvider Provider');
  }
  
  sendByPost(forma) {
    return this.http.post("http://httpbin.org/post", JSON.stringify(forma), httpOptions)
    .subscribe(
      data => console.log(data['origin']), // success path
      error => console.log('error') // error path
    )
  }
  
  getDaysFromProvider() {
    return this.http.get(this.configUrl).map(
      (response: Response) => {
        return response;
      }
    )
  }
  
}
