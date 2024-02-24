import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ForestComponent } from '../icons/forest/forest.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent  implements OnInit{

  public horas: number = 0 ;
  public minutos : number = 0;
  public segundos : number = 0;
  private timer : any;
  private date = new Date();

  public show: boolean = true;
  public disabled:boolean = false;
  public animate: boolean = false;

  @ViewChild("idAudio") idAudio!: ElementRef;

  constructor(){


  }

  ngOnInit(): void {
      
  }

  increment(type: 'H' | 'M' | 'S') {

    if(type==='H'){

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

      if(this.minutos<=0)return;
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


  start(){

    if(this.horas>0|| this.minutos>0 || this.segundos>0){

      this.disabled= true;
      this.show = false; //hide btn + and-
      this.updateTimer();

      if(this.segundos>0){

        this.timer = setInterval(()=>{

          this.updateTimer();

        }, 1000)
      }
    }

  }

}
