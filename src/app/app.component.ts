import { Component, OnInit } from '@angular/core';
import { HttpService } from './service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  types = ['Recent', 'Popular', 'Mixed'];
  restItems: any;
  status = '';
  hashtags: string;
  count: number;
  type: string;
  filter: string;

  constructor(private httpservice: HttpService) { }

  getRestItems(searchObj): void {
    console.log(searchObj);
    this.hashtags = searchObj.tags;
    this.count = searchObj.count;
    this.type = searchObj.type.toLowerCase();
    this.httpservice.getAll(this.hashtags, this.count, this.type)
      .subscribe(
        restItems => {
          this.restItems = restItems.sort((a, b) => {
            return b.id - a.id;
          });
        }
      );
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
