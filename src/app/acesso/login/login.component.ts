import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('email').markAsTouched(),
        this.formulario.get('senha').markAsTouched()
    }
    else {
      this.autenticacao.autenticar(
        this.formulario.value.email,
        this.formulario.value.senha
      )
    }

  }



}
