import { Component, OnInit } from '@angular/core';
import {  faUser, faHospital, faBuilding, faIdCardClip, faPeopleRoof, faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  options: any = [
    {
      tittle: 'Clientes',
      route: '/cliente',
      icon: faUser
    },
    {
      tittle: 'Seguros',
      route: '/seguro',
      icon: faPeopleRoof,
    },
    {
      tittle: 'Compañia',
      route: '/compania',
      icon: faBuilding,
    },
    {
      tittle: 'Compañia Seguro',
      route: '/companiaseguro',
      icon: faHospital,
    },
    {
      tittle: 'Perito',
      route: '/perito',
      icon: faIdCardClip
    },
    {
      tittle: 'Siniestro',
      route: '/siniestro',
      icon: faWarning
    }
  ]

  constructor() { }

  name: string = '';
  saludo: string = '';

  ngOnInit(): void {


  }

  saludar() {
    this.saludo = 'Hola ' + this.name + ' mucho gusto';

  }


}
