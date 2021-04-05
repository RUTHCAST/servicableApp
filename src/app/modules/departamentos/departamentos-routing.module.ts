import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { ListsDistritosComponent } from "./components/lists-distritos/lists-distritos.component";
import { ListsComponent } from "./components/lists/lists.component";

const routes: Routes = [
  {
    path: "",
    component: ListsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "distritos",
    component: ListsDistritosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "distritos/:id",
    component: ListsDistritosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentosRoutingModule {}
