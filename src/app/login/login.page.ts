import { Component } from '@angular/core';
import { GlobalVariables } from '../services/variables';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  form: object = {};

  constructor(
    public global: GlobalVariables,
    private http: Http,
    private router: Router
  ) {}

  login() {
    this.http.post(this.global.api_url + '/sessions', this.form)
      .subscribe((result: any) => {
        if (result.json().token) {
          this.global.setToken(result.json().token);
          this.router.navigate(['/contacts']);
          return;
        }
      },
      (error) => {
        this.global.setToken("");
        this.global.showToast(error.json().error, "danger");
      });
  }

  
}
