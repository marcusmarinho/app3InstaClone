import { Component, OnInit } from '@angular/core';
import { transition, animate,  style, state, trigger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations : [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)'}),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado' , [
        style({ opacity: 0, transform: 'translate(50px, 0)'}),
        animate('1.5s 0s ease-in-out', keyframes([
          //offset tempo de variação(0 a 1) da animação baseado no tempo da funcao animate 500ms
          style({ offset: 0.25, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.50, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.75, opacity: 1, transform: 'translateY(100px)'}),
          style({ offset: 0.85, opacity: 1, transform: 'translateY(50px)'}),
          style({ offset: 1, opacity: 1, transform: 'translateY(0px)'}),
        ]))
      ])
    ])   
  ]
})

export class AcessoComponent implements OnInit {

  public estadoBanner: string ='criado'
  public estadoPainel: string ='criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel( event: string ): void {
    this.cadastro = event === 'cadastro' ? true: false
  }

  public inicioDaAnimacao(): void {
  //  console.log('inicio da animacao')
  }

  public fimDaAnimacao(): void {
    //console.log('fim da animacao')
  }

}
