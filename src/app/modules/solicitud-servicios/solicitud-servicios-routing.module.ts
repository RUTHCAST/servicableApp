import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolicitudServiciosComponent } from "./components/solicitud-servicios.component";
import { ListsComponent } from "./components/lists/lists.component";
import { ListsServiciosComponent } from "./components/lists-servicios/lists-servicios.component";
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ListsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "servicios",
    component: ListsServiciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "servicios/:id",
    component: ListsServiciosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudServiciosRoutingModule {}
