import { Component } from '@angular/core';
import { GlobalVariables } from '../services/variables';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  form: object = {};

  constructor(
    public global: GlobalVariables,
    private http: Http
  ) {}

  register() {
    this.http.post(this.global.api_url + '/users', this.form)
      .subscribe((result: any) => {
        console.log('deu bom', result.json());
      },
      (error) => {
        this.global.showToast(error.json().error, "danger");
      });
  }
}
