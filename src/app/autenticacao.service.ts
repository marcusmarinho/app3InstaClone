import { Usuario } from '../app/acesso/usuario.model'
//recursos utilizados pelo firebase
import * as  firebase from 'firebase' 

export class Autenticacao {
    public cadastroUsuario(usuario: Usuario): void {
        console.log('chegamos até o serviço', usuario)

        //auth seleciona a dimensao de autenticacao do servico do firebase
        //.database dimensao banco de dados

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.password)
            .then(( resposta: any ) =>{
                //btoa() converte string para padrao 64, precisamos disso pois email contem caracteres especiais

              //  delete usuario.password

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario )
            })
            .catch(( error: Error) =>{
                console.log(error)
            })
    }
}