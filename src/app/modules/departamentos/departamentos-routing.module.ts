import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListsDistritosComponent } from "./components/lists-distritos/lists-distritos.component";
import { ListsComponent } from "./components/lists/lists.component";

const routes: Routes = [
  { path: "", component: ListsComponent },
  { path: "distritos", component: ListsDistritosComponent },
  { path: "distritos/:id", component: ListsDistritosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentosRoutingModule {}
