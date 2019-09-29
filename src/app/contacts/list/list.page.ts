import { Component } from '@angular/core';
//import { HTTP } from '@ionic-native/http/ngx';
import { Http, Headers } from '@angular/http';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GlobalVariables } from '../../services/variables';
import { EditModal } from './modal-edit.page';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  
  public items: Array<{ title: string; note: string; icon: string }> = [];
  public item: object = {};

  constructor(
    private http: Http, 
    public toastController: ToastController,
    public modalController: ModalController,
    public global: GlobalVariables
  ) {
    this.list();
  }

  async presentModal(props = {}) {
    const modal = await this.modalController.create({
      component: EditModal,
      componentProps: props
    });

    var $this = this;

    modal.onDidDismiss().then(function() {
      $this.list();
    });

    return await modal.present();
  }

  list() {
    
    this.http.get(this.global.api_url + "/contacts", {
        headers: new Headers({
          'Authorization': 'Bearer ' + this.global.getToken()
        })
      })
      .subscribe((result: any) => {
        console.log('result', result.json());
        this.items = result.json().docs;
      },
      (error) => {
        this.global.showToast(error.json().error, "danger");
      });
  }

  async delete(id: any) {
    this.http.delete(this.global.api_url + "/contacts/" + id, {
      headers: new Headers({
        'Authorization': 'Bearer ' + this.global.getToken()
      })
    })
    .subscribe((result: any) => {
      this.global.showToast("Contato apagado!", "success");

      this.list();
    },
    (error) => {
      this.global.showToast(error.json().error, "danger");
    });    
  }

}
