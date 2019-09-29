import { Component } from '@angular/core';
import { GlobalVariables } from '../services/variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html'
})
export class LogoutPage {

  constructor(
    public global: GlobalVariables,
    private router: Router
  ) {
    this.logout();
  }

  logout() {
    this.global.setToken("");
    this.router.navigate(['/login']);
  }
}
