import { Component, OnInit } from '@angular/core';
import { style, transition, animate, state, trigger } from '@angular/animations';
import { Imagem } from './imagem.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  // Angular Animations
  animations:[
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel' , animate('3s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  constructor() { }

  public estado: string = 'escondido'

  public imagens: Imagem[] = [
    { estado: 'visivel',   url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3300 )
  }

  public logicaRotacao(): void {
    
    //auxilia na exibicao da imagem seguinte
    let idx: number = 0

    //ocultar imagem
    for ( let i : number = 0 ; i <= 4 ; i++ ) {

        if (this.imagens[i].estado === 'visivel') {
          this.imagens[i].estado = 'escondido'
          idx = i === 4 ? 0 : i + 1
          break
        }
    }
    //exibir a proxima imagem
    this.imagens[idx].estado = 'visivel'
    setTimeout(() => this.logicaRotacao(), 3300 )
  }

}
