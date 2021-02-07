import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./components/categories/categories.component";
import { PlansComponent } from "./components/plans/plans.component";
import { TypesComponent } from "./components/types/types.component";
import { ProductsComponent } from "./components/products.component";

import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
  declarations: [
    CategoriesComponent,
    PlansComponent,
    TypesComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
