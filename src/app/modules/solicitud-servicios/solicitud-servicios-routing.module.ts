import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolicitudServiciosComponent } from "./components/solicitud-servicios.component";
import { ListsComponent } from "./components/lists/lists.component";
import { ListsServiciosComponent } from "./components/lists-servicios/lists-servicios.component";

const routes: Routes = [
  { path: "", component: ListsComponent },
  { path: "servicios", component: ListsServiciosComponent },
  { path: "servicios/:id", component: ListsServiciosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudServiciosRoutingModule {}
