import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poisson } from '../../../global/models/poisson';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoissonService {

  private poissonPath = 'poisson';

  public constructor(private httpClient: HttpClient) { }


  public getPoissonDistribution(values: {size: number}): Observable<Poisson> {
    return this.httpClient.post<Poisson>(`${environment.apiUrl}/${this.poissonPath}`, values);
  }
}
