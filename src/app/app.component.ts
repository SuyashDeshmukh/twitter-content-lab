import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  types = ['Recent', 'Popular', 'Mixed'];
  title = 'app';
  restItems: any;
  status = '';
  hashtags: string;
  count: number;
  type: string;
  filter: string;

  constructor(private httpservice: HttpService) {
    this.type = 'Recent';
    this.filter = 'recent';
    this.hashtags = '';
    this.restItems = [];
    this.count = 10;
  }


  searchTweets() {
    console.log('in search');
    if (this.validtags()) {
      if (this.count > 0) {
        if (this.count > 100) {
          this.count = 100;
        }
        this.getRestItems();
      } else {
        alert('Enter valid Count value');
        this.restItems = [];
        this.count = 10;
      }
    } else {
      alert('Invalid Hastags');
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

  validtags() {
    console.log('in validations');
    // this.hashtags += ' ';
    if (this.hashtags.length < 2) {
      return false;
    }
    const tags = this.hashtags.split(' ');
    console.log(tags);
    const regex = '/[!@#$%^&*(),.?":{}|<>/]/g';

    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];
      const tagname = tag.slice(1);
      if (tag.charAt(0) !== '#' || tag.length <= 1) {
        return false;
      } else if (/[!@#$%^&*(),.?":{}|<>/]/g.test(tagname)) {
        return false;
      } else if (/[0-9]/g.test(tagname[0])) {
        return false;
      }
    }
    return true;
  }

}
