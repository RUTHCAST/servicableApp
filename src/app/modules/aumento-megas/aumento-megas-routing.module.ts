import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { AumentoMegasComponent } from "./components/aumento-megas.component";
import { ListsPlanesComponent } from "./components/lists-planes/lists-planes.component";
import { ListsComponent } from "./components/lists/lists.component";

const routes: Routes = [
  {
    path: "",
    component: ListsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "planes",
    component: ListsPlanesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "planes/:id",
    component: ListsPlanesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AumentoMegasRoutingModule {}
