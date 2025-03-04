import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema= new Tema()
  listasTemas: Tema[]

  constructor(

    private router:Router,
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit(){

    if(environment.token==''){

      
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo !='adm'){

      this.alerta.showAlertDanger('Você precisa ser adm pra acessar essa rota')
      this.router.navigate(['/inicio'])
      
    }

    this.findAllTemas()

  }

 

  findAllTemas(){

    this.temaService.getAllTema().subscribe((resp: Tema[])=>{

      this.listasTemas = resp

    })
  }
  
  cadastrar(){

    this.temaService.postTema(this.tema).subscribe((resp:Tema)=>{
      this.tema = resp
      this.alerta.showAlertSucess('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema= new Tema()

    })
  }
} 
