import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ForestComponent } from '../icons/forest/forest.component';

import { Arvore } from '../model/Arvore';
import { ArvoreService } from '../service/arvore.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent  implements OnInit{

  constructor( private arvoreService : ArvoreService){

 
  


  }

 
  arvore: Arvore = new Arvore()
  public horas: number = 0 ;
  public minutos : number = 0;
  public segundos : number = 0;
  private timer : any;
  private date = new Date();

  public show: boolean = true;
  public disabled:boolean = false;
  public animate: boolean = false;
  

  @ViewChild("idAudio") idAudio!: ElementRef;


  

  

  ngOnInit(): void {
      
  }

  convertToMilliseconds(): number {

    return ((this.horas * 60 * 60) + (this.minutos * 60) + this.segundos) * 1000;

  }
  

  increment(type: 'H' | 'M' | 'S') {

    if(type==='H'){
    

       //Quando return; é chamado dentro de uma função ou método, 
       //isso indica que a execução da função ou método será encerrada im
       // ediatamente e o controle será retornado para o chamador. Em outras palavras,
       //  a função ou método será interrompido nesse ponto e qualquer código após a 
       // instrução return não será executado.
      if(this.horas>=99)
      return ;
        
      this.horas+=1;
    }
    else if(type==='M'){

      if(this.minutos>=59)return;
      this.minutos+=1;
    }
    else{

      if(this.segundos>59)return;

      this.segundos+=1;

    }


  }

  decrement(type: 'H' | 'M' | 'S'){


    if(type==='H'){

      if(this.horas<=0)
      return ;
        
      this.horas-=1;
    }
    else if(type==='M'){

      if(this.minutos<=0)
      return;
      this.minutos-=1;
    }
    else{

      if(this.segundos<=0 )return;

      this.segundos-=1;

    }

  }

  updateTimer(){

    this.date.setHours(this.horas)
    this.date.setMinutes(this.minutos)
    this.date.setSeconds(this.segundos)
    this.date.setMilliseconds(0)
    const time = this.date.getTime()
    this.date.setTime(time-1000)

    this.horas = this.date.getHours();
    this.minutos = this.date.getMinutes()
    this.segundos = this.date.getSeconds();
    
    if(this.date.getHours()===0   && 
       this.date.getMinutes()===0 && 
       this.date.getSeconds()==0) {

        //stop interval
        this.idAudio.nativeElement.play();
        this.animate = true;
        setTimeout(() => {

          this.stop()
          this.idAudio.nativeElement.load();
          
        }, 5000);
       }
  }

  stop(){

    this.disabled= false;
    this.show= true;
    this.animate = false;
    clearInterval(this.timer);
    this.idAudio.nativeElement.load();
  }


  reset(){

    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.stop();


  }

  
  converterParaMinutos = (): string => {
    // Converter cada unidade de tempo para minutos
    const minutosHoras = this.horas * 60;
    const minutosMinutos = this.minutos;
    const minutosSegundos = this.segundos / 60;
  
    // Somar todas as unidades de tempo convertidas
    const totalMinutos = minutosHoras + minutosMinutos + minutosSegundos;
  
    // Arredondar o resultado para o número inteiro mais próximo e converter para string
    return Math.round(totalMinutos).toString();

  };
  

  

  start(){

   
     

   
    this.arvore.tempoConcentracao = this.converterParaMinutos()
    
    alert( this.arvore.tempoConcentracao)

    if(this.horas>0|| this.minutos>0 || this.segundos>0){

      this.disabled= true;
      this.show = false; //hide btn + and-
      this.updateTimer();

      if(this.segundos>0){

        this.timer = setInterval(()=>{

          this.updateTimer();

        }, 1000)
      }


    
      
      
     
      this.arvoreService.plantar(this.arvore).subscribe((resp: Arvore)=>{

        console.log(resp)

        
        

        
        this.arvore = resp

        console.log(this.arvore);
        
        this.arvore = new Arvore()
       
      })

      

    }

  }

}


