import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() clearTweets: EventEmitter<any> = new EventEmitter();
  @Output() getTweets: EventEmitter<any> = new EventEmitter();

  types = ['Recent', 'Popular', 'Mixed'];
  hashtags: string;
  count: number;
  type: string;
  filter: string;

  constructor() {
    this.type = 'Recent';
    this.filter = 'recent';
    this.hashtags = '';
    this.count = 10;
   }

  ngOnInit() {
  }

  searchTweets() {
    console.log('in search');
    if (this.validtags()) {
      if (this.count > 0) {
        if (this.count > 100) {
          this.count = 100;
        }
        // this.getRestItems();
        this.getTweets.emit( {tags: this.hashtags, count: this.count, type: this.type});
      } else {
        alert('Enter valid Count value');
        // this.restItems = [];
        this.count = 10;
      }
    } else {
      alert('Invalid Hastags');
      // this.restItems = [];
      this.count = 10;
    }
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

  clear() {
    this.clearTweets.emit();
  }

}
