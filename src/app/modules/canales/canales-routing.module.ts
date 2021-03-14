import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanalesComponent } from './canales.component';

const routes: Routes = [{ path: '', component: CanalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanalesRoutingModule { }
