import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { AlertasComponent } from '../alertas/alertas.component';

@Injectable({
  providedIn: 'root'
})

export class AlertasService {


  constructor(

    private bsModalService: BsModalService

  ) { }

  private showAlert(message: string , type : string){

    const BsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent)
    BsModalRef.content.type = type
    BsModalRef.content.message = message

  }

  showAlertDanger(message:string){

    this.showAlert(message, 'danger')
  }

  showAlertSucess(message:string){


    this.showAlert(message,'sucess')
  }

  showAlertInfo(message:string){

    this.showAlert(message,'info')
  }

}
