
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arvore } from '../model/Arvore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArvoreService {

  constructor(private http : HttpClient) {

         

   }


   plantar(arvore : Arvore):Observable<Arvore>{

    return this.http.post<Arvore>('http://localhost:8080/arvore/plantar' , arvore)

   }

}