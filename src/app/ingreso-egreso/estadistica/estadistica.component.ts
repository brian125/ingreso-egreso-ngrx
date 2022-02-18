import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartData, ChartType } from 'chart.js';
import { AppStateWhithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

 ingresos: number = 0;
 egresos: number = 0;

 totalEgresos: number = 0;
 totalIngresos: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store:Store<AppStateWhithIngreso> ) {


   }

  ngOnInit(): void {

    this.store.select('ingresosEgresos')
      .subscribe( ({items}) => this.generarEstadistica(items) )

  }

  generarEstadistica( items: IngresoEgreso[]) {

    this.totalEgresos = 0;
    this.totalIngresos = 0;

    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData.datasets =  [{data: [this.totalIngresos, this.totalEgresos]}]

  }

}
