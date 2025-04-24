import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { AlertasService } from '../service/alertas.service';
import { environment } from '../../environments/environments.prod';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent  implements OnInit{

  userLogin: UserLogin = new UserLogin()

  constructor(
    
    private auth : AuthService,
    private router:Router ,
    private alerta:AlertasService  
  ){

   
  }

  ngOnInit() {

    window.scroll(0,0)
    console.log("Neymar voltou , carai")
      
  }

  entrar(){

    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{

      this.userLogin= resp
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo
      console.log(resp.nome)
      console.log(resp.id)

      this.router.navigate(['/timer'])


    },erro=>{

      if(erro.status==500){

        this.alerta.showAlertDanger('Usuário ou senha estão incorretos')
      }

    })
  }
}
