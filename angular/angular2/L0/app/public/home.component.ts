import { Component } from '@angular/core';

@Component({
  selector: 'my-home',
  template: `<div style="background-color:gray;"><h3>Hello, this is {{name}}</h3></div>`,
})
export class HomeComponent  { name = 'HomeComponent'; }
