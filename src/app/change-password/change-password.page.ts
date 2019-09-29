import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'change-password.page.html',
  styleUrls: ['change-password.page.scss'],
})
export class ChangePasswordPage {

  form: object = {};

  constructor() {
    this.form = {};
  }

  changePassword() {
    console.log('this.form', this.form);
  }
}
