import { Component, OnInit, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
@Component({
  selector: 'app-my-rxjs',
  templateUrl: './my-rxjs.component.html',
  styleUrls: ['./my-rxjs.component.css']
})
export class MyRxjsComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    let obs = this.http.get('/assets/data.json');
    console.log(
      "-----------> observable = ", 
      obs
    );
    obs.subscribe(function(result){
      console.log("----------- apiLogin() result.json =", result.json());
    });

  }

}
