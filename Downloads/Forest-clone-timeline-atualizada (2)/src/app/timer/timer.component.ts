import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ForestComponent } from '../icons/forest/forest.component';
import { Arvore } from '../model/Arvore';
import { ArvoreService } from '../service/arvore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {

  constructor(
    private arvoreService: ArvoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  arvore: Arvore = new Arvore();
  idPost: number;
  public minutos: number = 0;
  public segundos: number = 0;
  private timer: any;
  private date = new Date();

  public show: boolean = true;
  public disabled: boolean = false;
  public animate: boolean = false;

  public imagemSrc = '../../assets/tree.png'; // Caminho da imagem padrão
  public texto = 'Get back to work!';

  @ViewChild("idAudio") idAudio!: ElementRef;

  ngOnInit(): void {
    // Inicialização, se necessário
  }

  convertToMilliseconds(): number {
    return ((this.minutos * 60) + this.segundos) * 1000;
  }

  increment(type: 'M' | 'S') {
    if (type === 'M') {
      if (this.minutos >= 120) return;
      this.minutos += 5;
    } else {
      if (this.segundos >= 59) return;
      this.segundos += 5;
    }
  }

  decrement(type: 'M' | 'S') {
    if (type === 'M') {
      if (this.minutos <= 0) return;
      this.minutos -= 5;
    } else {
      if (this.segundos <= 0) return;
      this.segundos -= 5;
    }
  }

  updateTimer() {
    this.date.setMinutes(this.minutos);
    this.date.setSeconds(this.segundos);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);

    this.minutos = this.date.getMinutes();
    this.segundos = this.date.getSeconds();

    if (this.date.getMinutes() === 0 && this.date.getSeconds() === 0) {
      // Stop interval
      this.idAudio.nativeElement.play();
      this.animate = true;
      setTimeout(() => {
        this.stop();
        this.idAudio.nativeElement.load();
      }, 5000);
    }
  }

  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    clearInterval(this.timer);
    this.idAudio.nativeElement.load();
  }

  reset() {
    alert("Deseja cancelar essa sessão? Se sim, a árvore será apagada.");
    alert("Você terá uma árvore murcha.");

    this.minutos = 0;
    this.segundos = 0;
    this.stop();

    alert(this.idPost);

    this.arvore.estaMurcha = true;

    this.arvoreService.encerrarSessão(this.idPost, this.arvore).subscribe((resp: Arvore) => {
      this.arvore = resp;
      console.log(resp);
    });

    this.imagemSrc = '../../assets/tree_death.png'; // Caminho da nova imagem
    this.texto = 'Your tree died!';
  }

  converterParaMinutos = (): string => {
    const minutosMinutos = this.minutos;
    const minutosSegundos = this.segundos / 60;

    const totalMinutos = minutosMinutos + minutosSegundos;

    return Math.round(totalMinutos).toString();
  };

  start() {
    this.texto = 'Get back to work!';
    this.imagemSrc = '../../assets/tree.png';

    this.arvore.tempoConcentracao = this.converterParaMinutos();

    alert(this.arvore.tempoConcentracao);

    if (this.minutos > 0 || this.segundos > 0) {
      this.disabled = true;
      this.show = false; // Hide btn + and -
      this.updateTimer();

      if (this.segundos > 0) {
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }

      this.arvoreService.plantar(this.arvore).subscribe((resp: Arvore) => {
        this.arvore.estaMurcha = false;
        this.arvore = resp;

        this.idPost = this.arvore.id;
        alert('ID da árvore criada:' + this.idPost);
        console.log('ID da árvore criada:', this.idPost);
        console.log(this.arvore);

        this.arvore = new Arvore();
      });
    }
  }
}


