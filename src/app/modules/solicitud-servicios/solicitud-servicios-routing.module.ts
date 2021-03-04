import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolicitudServiciosComponent } from "./components/solicitud-servicios.component";

const routes: Routes = [{ path: "", component: SolicitudServiciosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudServiciosRoutingModule {}
