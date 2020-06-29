import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/ìnterfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() indice:number;
  @Input() enFavoritos;

  constructor(private iab:InAppBrowser,
              private actionSheetCtrl:ActionSheetController,
              private socialSharing:SocialSharing,
              private dataLocalService:DataLocalService,
              private platform: Platform) { }

  ngOnInit() {
    console.log('favorito', this.enFavoritos)
  }


  abrirNoticia(){

    console.log('Noticia', this.noticia.url)
    const browser = this.iab.create( this.noticia.url, '_system');
  }

  async lanzarMenu(){
    console.log('menu')

    let guardarBorrarBtn;

    if(this.enFavoritos){

      guardarBorrarBtn = {
        text: 'Eliminar Favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log('Borrar favorito');
          this.dataLocalService.borrarNoticia(this.noticia)
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favoritos',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia)
        }
      }
    }


    const actionSheet = await this.actionSheetCtrl.create({
      
        buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          console.log('Share clicked')
          this.compartirNoticia()
          
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  

  }

  compartirNoticia(){

    if(this.platform.is('cordova')){
      
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url 
          )

    }else{

      if (navigator['share']) {

        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('no se pudo compartir porque no se soporta')
      }
    }
  }
}
