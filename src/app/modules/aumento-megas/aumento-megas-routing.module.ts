import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AumentoMegasComponent } from "./components/aumento-megas.component";
import { ListsComponent } from "./components/lists/lists.component";

const routes: Routes = [{ path: "", component: ListsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AumentoMegasRoutingModule {}
