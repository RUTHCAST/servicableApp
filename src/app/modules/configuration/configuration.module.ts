import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../core/core.module";

import { ConfigurationRoutingModule } from "./configuration-routing.module";

import { ConfigurationComponent } from "./configuration.component";
import { BackgroundsComponent } from "./components/backgrounds/backgrounds.component";
import { CarruselComponent } from "./components/carrusel/carrusel.component";
import { EditComponent } from "./components/backgrounds/edit/edit.component";
import { NewComponent } from "./components/carrusel/new/new.component";

@NgModule({
  declarations: [
    ConfigurationComponent,
    BackgroundsComponent,
    CarruselComponent,
    EditComponent,
    NewComponent,
  ],
  imports: [CommonModule, ConfigurationRoutingModule, CoreModule],
})
export class ConfigurationModule {}
