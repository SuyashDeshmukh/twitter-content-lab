import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  filter: string;

  @Input()
  restItems: any[];

  constructor() {
    this.filter = 'recent';
   }

  ngOnInit() {
  }

  sortTweets() {
    console.log('value ' + this.filter);
    if (this.filter === 'recent') {
      this.restItems = this.restItems.sort((a, b) => {
        return b.id - a.id;
      });
    } else if (this.filter === 'retweets') {
      this.restItems = this.restItems.sort((a, b) => {
        return b.retweets - a.retweets;
      });
    } else {
      this.restItems = this.restItems.sort((a, b) => {
        return b.favorites - a.favorites;
      });
    }
  }
}
