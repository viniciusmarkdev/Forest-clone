
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arvore } from '../model/Arvore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ArvoreService {

  constructor(private http : HttpClient) {}

  token={

    headers : new HttpHeaders().set('Authorization',environment.token)
  }


   getAllTrees():Observable<Arvore[]>{

    return this.http.get<Arvore[]>('https://forest-clone.onrender.com//arvore')
   }

   plantar(arvore : Arvore):Observable<Arvore>{

    return this.http.post<Arvore>('https://forest-clone.onrender.com/arvore/plantar' , arvore)

   }

   encerrarSessão(id : number , arvore : Arvore):Observable<Arvore>{

    return this.http.put<Arvore>(`https://forest-clone.onrender.com/arvore/${id}`, arvore )

   }

   
  updateCoin(id : number , arvore: Arvore):Observable<Arvore>{

    return this.http.put<Arvore>(`https://forest-clone.onrender.com/arvore/updateCoin/${id}` , arvore)
  }


  





   
}