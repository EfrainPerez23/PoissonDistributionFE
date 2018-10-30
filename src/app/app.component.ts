import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoissonService } from './poisson.service';
import { Poisson } from './poisson';
import swal from 'sweetalert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('f')
  slForm: NgForm;
  public loading: boolean;
  public poisson: Poisson;

  public constructor(private poissonService: PoissonService) {}

  public onSubmit(form: NgForm): void {
    if (form.value && form.valid) {
      this.loading = true;
      this.poissonService.getPoissonDistribution(form.value).subscribe(
        (poisson: Poisson): void => {
          this.loading = false;
          swal('Valores Poisson', 'Generados correctamente !', 'success');
          this.poisson = poisson;
        }
      , (error: HttpErrorResponse): void => {
          this.loading = false;
      });
    }
  }
}
