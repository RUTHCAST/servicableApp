import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./components/details/details.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";

const routes: Routes = [
  { path: "", component: ListsComponent },
  { path: "details", component: DetailsComponent },
  { path: "edit", component: EditComponent },
  { path: "new", component: NewComponent },
  { path: "", redirectTo: "/lists", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModuleModule {}
