import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.css']
})
export class AccoutSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

  cambiarColor(tema: string){
    console.log(tema);

    let url = `assets/css/colors/${ tema }.css`
    this._document.getElementById('tema').setAttribute('href', url);
  }

}
