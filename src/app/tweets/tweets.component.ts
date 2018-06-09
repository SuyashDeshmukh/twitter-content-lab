import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  @Input()
  restItems: any[];

  constructor() { }

  ngOnInit() {
  }

}
