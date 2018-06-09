import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  types = ['Recent', 'Popular', 'Mixed'];
  title = 'app';
  restItems: any;
  status = '';
  hashtags: string;
  count: number;
  type = 'Recent';
  filter = 'recent';
  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    // this.getRestItems();
    this.count = 10;
    this.restItems = [];
    // this.type = 'Recent';
  }

  searchTweets() {
    if (this.count > 0) {
      this.getRestItems();
    } else {
      alert('Enter valid Count value');
      this.restItems = [];
      this.count = 10;
    }
  }

  getRestItems(): void {
    // const tags  = this.hashtags.replace('\#', '');
    console.log(this.hashtags + this.count + this.type);
    this.filter = 'recent';
    this.status = 'Loading..';
    this.httpservice.getAll(this.hashtags, this.count, 'Recent')
      .subscribe(
        restItems => {
          this.restItems = restItems.sort((a, b) => {
            return b.id - a.id;
          });
          console.log(this.restItems);
        });
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

  clear() {
    // console.log('clear called');
    this.restItems = [];
    // console.log(this.restItems);
    this.hashtags = '';
    this.count = 10;
    this.type = 'Recent';
  }

}
