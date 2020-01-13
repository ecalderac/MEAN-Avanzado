import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles:[]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
   }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  //Funcion que detecta cualquier cambio cuando se teclea un valor
  onCambios( newValue: number){

    // let elemHtml: any = document.getElementsByName('progreso')[0]; //establece condicion en input para colocar valores entre 0 y 100

    console.log(newValue);

    if(newValue >= 100){
      this.progreso = 100;
    }else if (newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    // elemHtml.value = Number(this.progreso); //establece condiciones en input entre 0 y 100
    this.txtProgress.nativeElement.value = this.progreso;
    
    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

  cambiarValor( valor: number ){

    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
        return;
    }

    if(this.progreso <=0 && valor < 0){
      this.progreso = 0;
        return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );

  }

}
