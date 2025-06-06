import { Component, OnInit } from '@angular/core';
import { ArvoreService } from '../service/arvore.service';
import { Arvore } from '../model/Arvore';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environments.prod';
import { User } from '../model/User';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent  implements OnInit {

  postagem:Arvore= new Arvore()
  
  user: User = new User();

  idUser:number
  
  public  imagemSrc = '../../assets/tree.png';

  public pinheiro = '../../assets/arvoreGrande.png';

  public plantball = '../../assets/plant-ball.png';


  public treeDeath = '../../assets/tree_death.png';



  listaArvores: Arvore[]

  

  constructor(

    private arvoreService:ArvoreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,

  ){
    
  }

  
  
  ngOnInit() {


    if (environment.token == '') {
      
      this.router.navigate(['/entrar']);
    }

   
 
  window.scroll(0, 0);



  this.idUser = this.route.snapshot.params['id']
  

   this.findByIdUser(this.idUser)
 
}



findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp: User)=>{

    this.user = resp
  })
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
