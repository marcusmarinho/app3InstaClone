import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Progresso } from '../../progresso.service'
import { Bd } from '../../bd.service'
import { Observable, Subject } from 'rxjs-compat'
import 'rxjs/Rx'
import * as firebase from 'firebase'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  //Variavel para atualizar Time Line
  @Output() public atualizarTimeLine: EventEmitter <any> = new EventEmitter

  public email: string
  private imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number
  public eventoUploadRecebido: boolean

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null,[Validators.required, Validators.maxLength(30)])
  })

  constructor(private bd: Bd,
              private progresso: Progresso) { }

  ngOnInit() {
    console.log(this.formulario)
    /*
    Metodo que se inscreve no observable do firebase que dispara eventos quando existem modificações
    no estado do usuario autenticado.
    Dessa forma pode recuperar o e-mail para que possamos implementar o metodo publicar
    */
    firebase.auth().onAuthStateChanged((user)=> {
      this.email = user.email
    })
  }

  
  public publicar(): void {
    this.bd.publicar({
      email:  this.email,
      imagem: this.imagem[0],
      titulo: this.formulario.value.titulo
    })


    
    if(this.formulario.status ==='INVALID'){
      this.formulario.get('titulo').markAsTouched()
    }
    
    //dispara um evento a cada 1,5s
    let acompanhamentoUpload = Observable.interval(1500)
    //assinar observable
    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {      
        console.log(this.progresso.status)
        console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / 
                                             this.progresso.estado.totalBytes
                                           ) * 100)

        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          //emitir evento de component parent(HOME neste caso)
          //atualizar publicacoes a cada nova publicacao
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
    })
  }

  public preparaImagemUpload(event: Event): void {
    this.eventoUploadRecebido = event.returnValue
    if (this.eventoUploadRecebido = true){
      this.imagem = (<HTMLInputElement>event.target).files
    }
  }
}
