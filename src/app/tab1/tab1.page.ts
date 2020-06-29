import { Component } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../ìnterfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  noticias: Article[]=[];

  constructor(private noticasService:NoticiasService) {}


  ngOnInit(){
    this.cargarNoticias()
  }

  loadData(event){
    console.log('loadData',event)
    this.cargarNoticias(event)
  }

  cargarNoticias(event?){
    this.noticasService.getTopHeadlines().subscribe((resp) => {
       console.log('noticias', resp)
     
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete()
        return;
      }

      this.noticias.push(...resp.articles)

      if(event){
        event.target.complete()
      }
    })
  }
}
