import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./lists/list.component";
import { NewComponent } from "./new/new.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { AuthGuard } from "../../../../core/guards/auth.guard";

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
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
