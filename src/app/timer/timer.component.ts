import { Component, OnInit } from '@angular/core';
import { Arvore } from '../model/Arvore';
import { ArvoreService } from '../service/arvore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { environment } from '../../environments/environments.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  arvore: Arvore = new Arvore();
  idPost: number;
  public minutos: number = 0;
  public segundos: number = 0;
  private timer: any;
  private totalSeconds: number = 0;

  public show: boolean = true;
  public disabled: boolean = false;
  public animate: boolean = false;
  public isTimerRunning: boolean = false;
  public coin: number = 0;
  public isStartDisabled: boolean = true;
  public isZeroTime: boolean = false;

  public imagemSrc = '../../assets/tree.png';
  public texto = 'Click the tree to start planting!';
  public seta = '../../assets/setadireita.png';
  public seta1 = '../../assets/setaesquerda.png';
  public arvore1: string | null = null;
  public tresBarras = '../../assets/tres-barras.png';

  idUser = environment.id;
  user: User = new User();
  nome = environment.nome;
  token = environment.token;
  id = environment.id;


  
  constructor(
    private arvoreService: ArvoreService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  
  ngOnInit() {
    window.scroll(0, 0);
    console.log('ID do usuário:', this.idUser);
    this.findByIdUser();
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp;
    });
  }

  getAllCoins() {
    this.authService.getAllCoins(this.idUser, this.user).subscribe((resp: User) => {
      this.user = resp;
      console.log(resp);
    });
  }

  increment() {
    if (this.minutos >= 120) return;
    this.minutos += 1;
    this.updateStartButtonState();
  }

  decrement() {
    if (this.minutos < 1) {
      this.minutos = 0;
    } else {
      this.minutos -= 1;
    }
    this.updateStartButtonState();
  }

  updateStartButtonState() {
    this.isStartDisabled = this.minutos <= 0 && this.segundos <= 0;
  }

  updateTimer() {
    if (this.minutos === 0 && this.segundos === 0) {
      this.animate = true;
      this.isZeroTime = true;
      this.isTimerRunning = false;
      
      // Set the completed tree image and hide the default one
      this.arvore1 = '../../assets/pinheiro.png';
      this.stop();

      console.log(`Sessão finalizada. +5 coins! Total: ${this.coin}`);

      this.arvoreService.updateCoin(this.idPost, this.arvore).subscribe((resp: Arvore) => {
        this.getAllCoins();
        this.arvore = resp;
        this.idPost = this.arvore.id;
      });
      return;
    }

    if (this.segundos === 0) {
      this.segundos = 59;
      this.minutos--;
    } else {
      this.segundos--;
    }
  }

  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    this.isZeroTime = false;
    this.isTimerRunning = false;
    clearInterval(this.timer);
  }

  reset() {
    if (confirm("Deseja cancelar essa sessão? Se sim, a árvore será apagada.")) {
      alert("Você terá uma árvore murcha.");
      this.minutos = 0;
      this.segundos = 0;
      this.stop();

      this.arvore.estaMurcha = true;
      this.isTimerRunning = false;
      this.arvore1 = null; // Reset arvore1 to show default image again
      this.imagemSrc = '../../assets/tree_death.png';
      this.texto = 'Your tree died!';

      this.arvoreService.encerrarSessão(this.idPost, this.arvore).subscribe((resp: Arvore) => {
        this.arvore = resp;
        console.log(resp);
      });
    }
  }

  start() {
    if (this.minutos === 0 && this.segundos === 0) {
      alert("Por favor, defina um tempo antes de iniciar o plantio.");
      return;
    }

    this.authService.getByIdUser(this.idUser).subscribe((user: User) => {
      this.arvore.usuario = user;
      this.isTimerRunning = true;
      this.texto = 'Get back to work!';
      this.imagemSrc = '../../assets/tree.png';
      this.arvore1 = null; // Ensure default image is shown at start
      this.arvore.tempoConcentracao = this.minutos.toString();
      this.disabled = true;
      this.show = false;

      this.totalSeconds = 0;
      this.coin = this.coin;

      this.updateTimer();
      this.timer = setInterval(() => {
        this.updateTimer();
        this.totalSeconds++;
      }, 1000);

      this.arvoreService.plantar(this.arvore).subscribe((resp: Arvore) => {
        this.arvore = resp;
        this.idPost = this.arvore.id;
        alert('ID da árvore criada:' + this.idPost);
        console.log('ID da árvore criada:', this.idPost);
        console.log(this.arvore);
      });
    });
  }
}
