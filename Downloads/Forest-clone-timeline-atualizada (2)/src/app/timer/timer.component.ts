import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Arvore } from '../model/Arvore';
import { ArvoreService } from '../service/arvore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
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

  public show: boolean = true;
  public disabled: boolean = false;
  public animate: boolean = false;
  public isTimerRunning: boolean = false;
  
  public isStartDisabled: boolean = true; // Inicialmente desabilitado
  public isZeroTime: boolean = false; // Controla quando o tempo é 00:00

  public imagemSrc = '../../assets/tree.png'; // Caminho da imagem padrão
  public texto = 'Click the tree to start planting!';
  public seta = '../../assets/setadireita.png';
  public seta1 = '../../assets/setaesquerda.png';

  @ViewChild("idAudio") idAudio!: ElementRef;

  ngOnInit(): void {
    this.updateStartButtonState(); // Atualiza o estado do botão ao iniciar
  }

  // Incrementa o tempo em 5 minutos
  increment() {
    if (this.minutos >= 120) return; // Limite de 120 minutos
    this.minutos += 5; // Incrementa de 5 em 5 minutos
    this.updateStartButtonState(); // Atualiza o estado do botão
  }

  // Decrementa o tempo em 5 minutos
  decrement() {
    if (this.minutos < 5) {
      this.minutos = 0; // Define como 0 se for menor que 5
    } else {
      this.minutos -= 5; // Decrementa de 5 em 5 minutos
    }
    this.updateStartButtonState(); // Atualiza o estado do botão
  }

  // Atualiza o estado do botão de início
  updateStartButtonState() {
    this.isStartDisabled = this.minutos <= 0 && this.segundos <= 0;
  }

  // Atualiza o timer
  updateTimer() {
    if (this.minutos === 0 && this.segundos === 0) {
      // Para o timer quando o tempo acabar
      this.idAudio.nativeElement.play();
      this.animate = true;
      this.isZeroTime = true; // Indica que o tempo chegou a 00:00
      setTimeout(() => {
        this.stop();
        this.idAudio.nativeElement.load();
      }, 5000);
      return;
    }

    if (this.segundos === 0) {
      this.segundos = 59;
      this.minutos--;
    } else {
      this.segundos--;
    }
  }

  // Para o timer
  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    this.isZeroTime = false; // Reset quando o timer é parado
    clearInterval(this.timer);
    this.idAudio.nativeElement.load();
  }

  // Reseta o timer
  reset() {
    if (confirm("Deseja cancelar essa sessão? Se sim, a árvore será apagada.")) {
      alert("Você terá uma árvore murcha.");

      // Reinicia o timer
      this.minutos = 0;
      this.segundos = 0;
      this.stop(); // Para o timer e remove a opacidade

      // Define a árvore como murcha
      this.arvore.estaMurcha = true;
      this.isTimerRunning = false;

      // Atualiza a árvore no servidor
      this.arvoreService.encerrarSessão(this.idPost, this.arvore).subscribe((resp: Arvore) => {
        this.arvore = resp;
        console.log(resp);
      });

      // Altera a imagem e o texto
      this.imagemSrc = '../../assets/tree_death.png'; // Imagem da árvore murcha
      this.texto = 'Your tree died!';
    }
  }

  // Inicia o timer
  start() {
    // Verifica se o tempo está zerado
    if (this.minutos === 0 && this.segundos === 0) {
        alert("Por favor, defina um tempo antes de iniciar o plantio.");
        return; // Impede que o timer seja iniciado
    }

    // Se o tempo estiver preenchido, inicia o timer
    this.isTimerRunning = true; // Define que o timer está em execução
    this.texto = 'Get back to work!';
    this.imagemSrc = '../../assets/tree.png';

    this.arvore.tempoConcentracao = this.minutos.toString();

    this.disabled = true;
    this.show = false; // Esconde os botões de incremento/decremento
    this.updateTimer();

    this.timer = setInterval(() => {
        this.updateTimer();
    }, 1000);

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
