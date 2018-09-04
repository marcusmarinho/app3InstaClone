import { Component, OnInit } from '@angular/core';
//Firebase Import
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app3';

  //config firebase
  ngOnInit(): void{
    var config = {
      apiKey: "AIzaSyB1wGiV3I7975HTbUISmCH5vABdStxEtEw",
      authDomain: "jta-instagram-clone-2f393.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-2f393.firebaseio.com",
      projectId: "jta-instagram-clone-2f393",
      storageBucket: "jta-instagram-clone-2f393.appspot.com",
      messagingSenderId: "544986444291"
    };

    firebase.initializeApp(config)
  }
}
