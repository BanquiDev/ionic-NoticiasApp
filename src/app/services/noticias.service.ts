import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../ìnterfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey
const apiUrl = environment.apiUrl
const proxyUrl = "https://cors-anywhere.herokuapp.com/"

const headers = new HttpHeaders({
  'X-Api-key':apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage= 0;
  
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query:string){

    
    query = proxyUrl + apiUrl + query

    return this.http.get<T>(query, {headers})
  }

  getTopHeadlines(){

    this.headlinesPage++;

   return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`)
  }

  getTopHeadlinesCategoria(categoria:string){
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria
    }
   return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
  }

}