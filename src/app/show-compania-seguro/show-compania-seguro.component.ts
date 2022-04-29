import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniaSeguroService } from '../service/compania-seguro/compania-seguro.service';

@Component({
  selector: 'app-show-compania-seguro',
  templateUrl: './show-compania-seguro.component.html',
  styleUrls: ['./show-compania-seguro.component.css']
})
export class ShowCompaniaSeguroComponent implements OnInit {

  id:any = [];
  compSeguro:any = [];
  seguro:any = [];
  compania:any = [];

  constructor(private route:ActivatedRoute, private servicioCompSeguro: CompaniaSeguroService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['element'];
      this.obtenerCompSeg(this.id);
    });

  }

  obtenerCompSeg(id:any){
    this.servicioCompSeguro.buscarCompSeguroById(id).subscribe(
      (res) => this.mostrarCompSeguro(res)
    )
  }
  
  mostrarCompSeguro(res:any){
    this.compSeguro = res;
    console.log(this.compSeguro[0].seguro)
    this.compania = this.compSeguro[0].compania;
    this.seguro = this.compSeguro[0].seguro;
  }

}
