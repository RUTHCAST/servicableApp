import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./components/details/details.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ListsComponent,
    canActivate: [AuthGuard],
  },
  { path: "details", component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "edit", component: EditComponent, canActivate: [AuthGuard] },
  { path: "new", component: NewComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "/lists", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModuleModule {}
