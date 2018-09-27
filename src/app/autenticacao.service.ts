import { Usuario } from '../app/acesso/usuario.model'
//recursos utilizados pelo firebase
import * as  firebase from 'firebase'

import { Router } from '@angular/router'
import { Injectable } from '@angular/core'


@Injectable()

export class Autenticacao {

    constructor(private router: Router) { }

    public token_id: string

    public cadastroUsuario(usuario: Usuario): Promise<any> {
    
        //auth seleciona a dimensao de autenticacao do servico do firebase
        //.database dimensao banco de dados

        return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.password)
            .then((resposta: any) => {
                //btoa() converte string para padrao 64, precisamos disso pois email contem caracteres especiais

                delete usuario.password

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log('Esse aqui é o log de erro', error.message)
            })
    }
    
    //Quando logado ao atualizar a pagina o usuario permanece logado
    public autenticar(email: string, senha: string): void {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                    })
            })
            .catch((erro: Error) => {       
                console.log(erro.message)          
            })

    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }
    
    public sair(): void {

        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })

        localStorage.removeItem('idToken')
    }
}