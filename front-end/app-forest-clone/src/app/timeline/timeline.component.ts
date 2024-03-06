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
  key = 'data'
  reverse = true

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

      this.listaArvores = resp.sort((a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });
    })


  }


  
  

}
