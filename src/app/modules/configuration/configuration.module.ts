import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../core/core.module";

import { ConfigurationRoutingModule } from "./configuration-routing.module";

import { ConfigurationComponent } from "./configuration.component";
import { BackgroundsComponent } from "./components/backgrounds/backgrounds.component";
import { CarruselComponent } from "./components/carrusel/carrusel.component";
import { EditImageComponent } from "./components/carrusel/edit-image/edit-image.component";
import { NewImageComponent } from './components/carrusel/new-image/new-image.component';
import { DeleteImageComponent } from './components/carrusel/delete-image/delete-image.component';
import { EditBackgroundsComponent } from './components/backgrounds/edit-backgrounds/edit-backgrounds.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    BackgroundsComponent,
    CarruselComponent,
    EditImageComponent,
    NewImageComponent,
    DeleteImageComponent,
    EditBackgroundsComponent,
  ],
  imports: [CommonModule, ConfigurationRoutingModule, CoreModule],
})
export class ConfigurationModule {}
