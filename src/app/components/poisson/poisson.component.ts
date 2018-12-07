import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Poisson, PoissonValues } from 'src/app/global/models/poisson';
import { PoissonService } from 'src/app/components/poisson/service/poisson.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import * as Chart from 'chart.js';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Component({
  selector: 'app-poisson',
  templateUrl: './poisson.component.html',
  styleUrls: ['./poisson.component.scss']
})
export class PoissonComponent implements OnInit {

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
      this.poissonService.getPoissonDistribution(form.value).subscribe(
        (poisson: Poisson): void => {
          this.loading = false;
          swal('Valores Poisson', '¡ Generados correctamente !', 'success');
          poisson.poissonValues = _.orderBy(poisson.poissonValues, ['y'], ['asc']);
          this.poisson = poisson;
          this.chart = new Chart(this.canvasRef.nativeElement.getContext('2d'), {
            type: 'bar',
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
          swal({title: error.statusText, text: error.message, icon: 'warning', dangerMode: true});
      });
    } else {
      swal({title: 'Error de campos', text: '¡ Debe llenar todos los campos !', icon: 'warning', dangerMode: true});
    }
  }

  public ngOnInit(): void { }

  public generateSheet(): void {
    if (this.poisson) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet<PoissonValues>(this.poisson.poissonValues);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Values');
      XLSX.writeFile(wb, 'PoissonVaues.xlsx');
    }
  }

}
