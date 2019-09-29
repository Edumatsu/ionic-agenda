import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class GlobalVariables {
  public api_url:string = "http://localhost:3000";

  constructor(
    public toastController: ToastController
  ) {}

  async showToast(message, cssClass = "success") {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: cssClass,
      position: "top"
    });
    
    toast.present();
  }

  setToken(token) {
    window.localStorage.api_token = token;
  }

  getToken() {
    return window.localStorage.api_token;
  }
}