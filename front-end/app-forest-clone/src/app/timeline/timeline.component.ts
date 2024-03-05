import { Component, OnInit } from '@angular/core';
import { ArvoreService } from '../service/arvore.service';
import { Arvore } from '../model/Arvore';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent  implements OnInit {

  postagem:Arvore= new Arvore()

 

  listaArvores: Arvore[]

  constructor(

    private arvoreService:ArvoreService

  ){
    
  }

  ngOnInit (){

    this.getAllTree()

  }


  getAllTree(){

    this.arvoreService.getAllTrees().subscribe((resp:Arvore[])=>{

      this.listaArvores =  resp
    })


  }


  
  

}
