import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar(userLogin: UserLogin):Observable<UserLogin>{

    return this.http.post<UserLogin>('https://forest-clone.onrender.com/usuarios/logar' , userLogin)

  }

  cadastrar(user: User): Observable<User>{

    return this.http.post<User>('https://forest-clone.onrender.com/usuarios/cadastrar',user)


  }


  getAllCoins(id : number , user : User):Observable<User>{

    return this.http.get<User>(`https://forest-clone.onrender.com/usuarios/${id}/calcularAllCoins`)

  }

  getByIdUser(id: number): Observable<User>{
      
    return this.http.get<User>(`https://forest-clone.onrender.com/usuarios/${id}`)
    
  }
  
    logado(){
    let ok:boolean = false

    if(environment.token !=''){

      ok = true 

    }

    return ok 

  }

  /** */

  adm(){

    let ok:boolean = false

    if(environment.tipo =='adm'){

      ok = true 

    }

    return ok


  
  }


  
}
