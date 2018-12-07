import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PoissonComponent } from './components/poisson/poisson.component';
import { AboutComponent } from './components/about/about.component';


const appRoutes: Routes = [
  { path: '', component: PoissonComponent },
  { path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
