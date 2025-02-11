import { Component, OnInit ,Input} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent  implements OnInit{

  @Input() message:string
  @Input() type: string = "success"


  constructor(

    public modal: BsModalRef

  ){

  }

  ngOnInit(): void {


      }

  onClose(){

    this.modal.hide()
  }


}
