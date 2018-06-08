import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  types = ['RECENT', 'POPULAR', 'MIXED'];
  title = 'app';
  restItems: any;
  status = '';
  hashtags: string;
  count: number;
  type = 'RECENT';
  filter = 'recent';
  constructor(private httpservice: HttpService) {}

  ngOnInit() {
    // this.getRestItems();
  }

  searchTweets() {
    this.status = 'Loading..';
    this.filter = 'recent';
    // this.type = this.type.toLowerCase();
    this.getRestItems();
  }

  getRestItems(): void {
    // const tags  = this.hashtags.replace('\#', '');
    console.log(this.hashtags);
    this.httpservice.getAll(this.hashtags, this.count, this.type.toLowerCase())
      .subscribe(
        restItems => {
          this.restItems = restItems.sort((a, b) => {
            return b.id - a.id;
          });
          console.log(this.restItems);
        }
      );
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
