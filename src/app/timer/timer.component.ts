import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Arvore } from '../model/Arvore';
import { ArvoreService } from '../service/arvore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { environment } from '../../environments/environments.prod';
import { AuthService } from '../service/auth.service';
 

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(
    private arvoreService: ArvoreService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService
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
  public coin: number = 0;
  public isStartDisabled: boolean = true; // Inicialmente desabilitado
  public isZeroTime: boolean = false; // Controla quando o tempo é 00:00

  public imagemSrc = '../../assets/tree.png'; // Caminho da imagem padrão
  public texto = 'Click the tree to start planting!';
  public seta = '../../assets/setadireita.png'; // Caminho da seta direita
  public seta1 = '../../assets/setaesquerda.png'; // Caminho da seta esquerda

  idUser = environment.id;
  user: User = new User();


  ngOnInit() {

    window.scroll(0,0)
    
    if(environment.token==''){

      
      this.router.navigate(['/entrar'])
    }

 
    this.findByIdUser()
 
  }

  findByIdUser(){


    this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{

      this.user = resp

    })

  }


  // Incrementa o tempo em 1 minuto
  increment() {
    if (this.minutos >= 120) return; // Limite de 120 minutos
    this.minutos += 1; // Incrementa de 1 em 1 minuto
    this.updateStartButtonState(); // Atualiza o estado do botão
  }

  // Decrementa o tempo em 1 minuto
  decrement() {
    if (this.minutos < 1) {
      this.minutos = 0; // Define como 0 se for menor que 1
    } else {
      this.minutos -= 1; // Decrementa de 1 em 1 minuto
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
      this.animate = true;
      this.isZeroTime = true; // Indica que o tempo chegou a 00:00

      // Define a árvore como murcha e atualiza a interface
      this.arvore.estaMurcha = true;
      this.isTimerRunning = false; // Garante que o timer não está mais em execução
      

      this.imagemSrc = '../../assets/pinheiro.png';
      // Para o timer e remove a sobreposição
      this.stop();

      // Atualiza a árvore no servidor
      this.arvoreService.encerrarSessão(this.idPost, this.arvore).subscribe((resp: Arvore) => {
        this.arvore = resp;
        console.log(resp);
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

  // Para o timer
  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    this.isZeroTime = false; // Reset quando o timer é parado
    this.isTimerRunning = false; // Garante que o timer não está mais em execução
    clearInterval(this.timer);
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
    if (this.minutos === 0 && this.segundos === 0) {
        alert("Por favor, defina um tempo antes de iniciar o plantio.");
        return;
    }

    // Primeiro busca o usuário completo
    this.authService.getByIdUser(this.idUser).subscribe((user: User) => {
        this.arvore.usuario = user; // Associa o usuário completo
        
        this.isTimerRunning = true;
        this.texto = 'Get back to work!';
        this.imagemSrc = '../../assets/tree.png';
        this.arvore.tempoConcentracao = this.minutos.toString();
        this.disabled = true;
        this.show = false;

        this.updateTimer();
        this.timer = setInterval(() => {
            this.updateTimer();
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