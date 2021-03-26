import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

import { BackgroundsComponent } from "./components/backgrounds/backgrounds.component";
import { CarruselComponent } from "./components/carrusel/carrusel.component";

const routes: Routes = [
  {
    path: "",
    component: BackgroundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "fondos-pantalla",
    component: BackgroundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "carrusel",
    component: CarruselComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
