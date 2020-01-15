import { Component, OnInit } from '@angular/core';

declare function init_plugins(); //llamar inicializaciones desde jquery, busca el plugin y crea una funcion dentro de el

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
