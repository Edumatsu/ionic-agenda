import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariables } from '../../services/variables';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-edit',
  templateUrl: 'modal-edit.page.html'
})
export class EditModal {
  form: object = {
    id: ''
  };
  editing: boolean = false;

  constructor(
    private http: Http,
    public modalController: ModalController,
    public global: GlobalVariables,
    navParams: NavParams,
    private router: Router
  ) {

    if (navParams.get('_id')) {
      this.form = {
        id: navParams.get('_id'),
        first_name: navParams.get('first_name'),
        last_name: navParams.get('last_name'),
        email: navParams.get('email'),
        instituicao: navParams.get('instituicao'),
        birthday: navParams.get('birthday')
      }

      this.editing = true;
    } 
  }

  createOrEdit() {
    const method = this.editing ? 'put' : 'post';

    const url = this.form.id ? '/contacts/' + this.form.id : '/contacts';

    this.http[method](this.global.api_url + url, this.form, {
        headers: new Headers({
          'Authorization': 'Bearer ' + this.global.getToken()
        })
      })
      .subscribe((result: any) => {
        this.global.showToast("Contato " + (this.editing ? "alterado!" : "cadastrado!"), "success");
        this.dismissModal();

        console.log('this', this);
      },
      (error) => {
        let msg = error.json().error;
        this.global.showToast(msg, "danger");

        if (msg == "Token not invalid") {
          this.router.navigate(['/login']);
        }
      });
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
