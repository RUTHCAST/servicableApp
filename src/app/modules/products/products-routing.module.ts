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
      title: "Categorias",
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
      title: "Tipos",
    },
    loadChildren: () =>
      import("./components/types/types.module").then((m) => m.TypesModule),
  },
  {
    path: "planes",
    component: PlansComponent,
    data: {
      title: "Planes",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
