import { Component, OnInit, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import $ from 'jquery';
import * as Rx from 'rxjs/Rx';

@Injectable()
@Component({
  selector: 'app-my-rxjs',
  templateUrl: './my-rxjs.component.html',
  styleUrls: ['./my-rxjs.component.css']
})
export class MyRxjsComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    // get data from ajax call and then use Rx.Observable.from ====================================
    let obs = this.http.get('/assets/data.json');
    console.log(
      "-----------> observable = ", 
      obs
    );
    obs.subscribe(function(result){
      console.log("----------- apiLogin() result.json =", result.json());
      let myResult = result.json();
      let records$ = Rx.Observable.from(myResult.records);
      records$.subscribe(
        v=>{
          console.log("----------- Rx success. v=",v);
        },
        error => {
          console.log("----------- Rx Error");
        },
        () => {
          console.log("----------- Rx complete");
        }
      );
    });

    // use Rx do an animation =====================================
    let btn1 = $("#but1");
    let btnClickObs$ = Rx.Observable.fromEvent(btn1,'click');
    btnClickObs$.subscribe(rv=>{
      console.log('rv',rv);
      let animationObs$ = Rx.Observable.interval(33).take(25);
      animationObs$.subscribe(
            rv2=>{
            console.log('rv2',rv2);
            $("#greenBox1").css({
              "margin-left": rv2*5+"px"
            });
          },
        err=>{

        },()=>{
          $("#greenBox1").css({
            "margin-left": "0px"
          });
        }
      );

    });


    

  }

}
