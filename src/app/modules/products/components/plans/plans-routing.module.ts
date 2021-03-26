import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../core/guards/auth.guard";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";

export const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nueva",
    component: NewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detalle",
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "editar",
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
