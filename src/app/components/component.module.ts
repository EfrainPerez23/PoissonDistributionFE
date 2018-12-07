import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoissonComponent } from './poisson/poisson.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [PoissonComponent, AboutComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PoissonComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentModule { }
