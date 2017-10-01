import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 
    
  }

  myId:number;
  private sub : any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.myId = +params['pageId']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

}
