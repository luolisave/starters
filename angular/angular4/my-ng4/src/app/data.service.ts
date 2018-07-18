import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getMyData() {
    return "'haha, this is the data string from service.'";
  }
  //King Ajax Document: https://codecraft.tv/courses/angular/http/core-http-api/ 

  getAjaxData() {
    /*
    this.http
        .get('/assets/data.json')
        .subscribe(
          function(result){
            this.result =result.json();
            console.log("this.result = ", this.result);
          }
        )
        ;
    //*/
    return this.http.get('/assets/data.json');
  }

  postAjaxData(postData){
    // post form 
    // https://stackoverflow.com/questions/35212341/angular2-http-post-request-parameters 

    // post json
    // https://codecraft.tv/courses/angular/http/core-http-api/
    return this.http.post('/assets/data.json',postData);
  }

  apiLogin(postData){
    return this.http.post('http://localhost:8888/api/v1/login',postData);
  }

}
