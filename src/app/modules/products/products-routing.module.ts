import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoriesComponent } from "./components/categories/categories.component";
import { TypesComponent } from "./components/types/types.component";
import { PlansComponent } from "./components/plans/plans.component";

export const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    data: {
      title: "Pagina de categorias",
    },
    loadChildren: () =>
      import("./components/categories/categories.module").then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: "tipos",
    component: TypesComponent,
    data: {
      title: "Pagina de tipos",
    },
  },
  {
    path: "planes",
    component: PlansComponent,
    data: {
      title: "Pagina de planes",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
