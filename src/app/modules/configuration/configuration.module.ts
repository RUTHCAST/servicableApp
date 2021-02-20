import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { ConfigurationComponent } from "./configuration.component";
import { BackgroundsComponent } from './components/backgrounds/backgrounds.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';

@NgModule({
  declarations: [ConfigurationComponent, BackgroundsComponent, CarruselComponent],
  imports: [CommonModule, ConfigurationRoutingModule],
})
export class ConfigurationModule {}
