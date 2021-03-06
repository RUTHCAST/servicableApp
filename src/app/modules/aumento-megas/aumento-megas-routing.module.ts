import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AumentoMegasComponent } from "./components/aumento-megas.component";
import { ListsPlanesComponent } from "./components/lists-planes/lists-planes.component";
import { ListsComponent } from "./components/lists/lists.component";

const routes: Routes = [
  { path: "", component: ListsComponent },
  { path: "planes", component: ListsPlanesComponent },
  { path: "planes/:id", component: ListsPlanesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AumentoMegasRoutingModule {}
