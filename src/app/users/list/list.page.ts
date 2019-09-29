import { Component, OnInit } from '@angular/core';
//import { HTTP } from '@ionic-native/http/ngx';
import { Http } from '@angular/http';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  public items: Array<{ title: string; note: string; icon: string }> = [];
  public item: object = {};

  constructor(private http: Http) {}

  list() {
    let url = "https://swapi.co/api/people/";

    return new Promise((resolve, reject) => {
      this.http.get(url, {})
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  showCard(item: any) {
    this.item = item;
  }

  hideCard() {
    this.item = {};
  }

  ngOnInit() {
    this.list()
      .then((result: any) => {
        console.log('result', result);
        this.items = result.results;
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }
}
