import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanalesRoutingModule } from './canales-routing.module';
import { CanalesComponent } from './canales.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [CanalesComponent, NewComponent, EditComponent, DeleteComponent],
  imports: [
    CommonModule,
    CanalesRoutingModule, 
    CoreModule
  ]
})
export class CanalesModule { }
