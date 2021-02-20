import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BackgroundsComponent } from "./components/backgrounds/backgrounds.component";
import { CarruselComponent } from "./components/carrusel/carrusel.component";
import { ConfigurationComponent } from "./configuration.component";

const routes: Routes = [
  { path: "", component: BackgroundsComponent },
  { path: "fondos-pantalla", component: BackgroundsComponent },
  { path: "carrusel", component: CarruselComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
