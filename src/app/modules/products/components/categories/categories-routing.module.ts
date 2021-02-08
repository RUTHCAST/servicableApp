import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./lists/list.component";
import { NewComponent } from "./new/new.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";

export const routes: Routes = [
  {
    path: "",
    component: ListComponent,
  },
  {
    path: "nueva",
    component: NewComponent,
  },
  {
    path: "detalle",
    component: DetailsComponent,
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
export class CategoriesRoutingModule {}
