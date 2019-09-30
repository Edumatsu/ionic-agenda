import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariables } from '../services/variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'change-password.page.html',
  styleUrls: ['change-password.page.scss'],
})
export class ChangePasswordPage {

  form: object = {};

  constructor(
    private http: Http,
    public global: GlobalVariables,
    private router: Router
  ) {}

  changePassword() {
    
    this.http.put(this.global.api_url + '/users', this.form, {
      headers: new Headers({
        'Authorization': 'Bearer ' + this.global.getToken()
      })
    })
    .subscribe((result: any) => {
      this.global.showToast("Senha alterada!", "success");
    },
    (error) => {
      let msg = error.json().error;
      this.global.showToast(msg, "danger");

      if (msg == "Token not invalid") {
        this.router.navigate(['/login']);
      }
    });
  }
}
