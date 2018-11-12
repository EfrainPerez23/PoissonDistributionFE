import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoissonService } from './poisson.service';
import { Poisson, PoissonValues } from './poisson';
import swal from 'sweetalert';
import * as Chart from 'chart.js';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loading: boolean;
  public poisson: Poisson;
  public chart: any;

  @ViewChild('f') public slForm: NgForm;
  @ViewChild('canvas') public canvasRef: ElementRef;

  public constructor(private poissonService: PoissonService) {}

  public onSubmit(form: NgForm): void {
    if (form.value && form.valid) {
      this.loading = true;
      this.poisson = this.chart = null;
      form.value.lambda = (<number>form.value.lambda).toString();
      this.poissonService.getPoissonDistribution(form.value).subscribe(
        (poisson: Poisson): void => {
          this.loading = false;
          swal('Valores Poisson', 'Generados correctamente !', 'success');
          this.poisson = poisson;
          this.chart = new Chart(this.canvasRef.nativeElement.getContext('2d'), {
            type: 'line',
            data: {
              labels: poisson.poissonValues.map((res: PoissonValues) => res.x),
              datasets: [
                {
                  label: 'Inverse Poisson Values',
                  data: poisson.poissonValues.map((res: PoissonValues) => res.y)
                }
              ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                label: 'Poisson'
            }
          });
        }
      , (error: HttpErrorResponse): void => {
          this.loading = false;
      });
    }
  }
}
