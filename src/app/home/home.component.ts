import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // #publicacaoes referenciada da view >> varialvel que recebe publicacoes
  @ViewChild ('publicacoes') public publicacoes: any
  @ViewChild ('incluirPublicacoes') public incluirPublicacoes: any
 
  constructor(private autenticacao: Autenticacao ) { }

  ngOnInit() {

  }

  public sair(): void {
    this.autenticacao.sair()
  }
  
  public modalManip(): void{
    this.incluirPublicacoes.progressoPublicacao = 'pendente'
    this.incluirPublicacoes.formulario.reset()
  }

  public atualizarTimeLine(): void{
    console.log('esse aqui é o atualizar time line ')
    this.publicacoes.atualizarTimeLine()

  }

}
