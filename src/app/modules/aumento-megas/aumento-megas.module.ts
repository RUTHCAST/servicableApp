import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AumentoMegasRoutingModule } from "./aumento-megas-routing.module";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { EditComponent } from "./components/edit/edit.component";
import { AumentoMegasComponent } from "./components/aumento-megas.component";
import { CoreModule } from "../../core/core.module";
import { ListsPlanesComponent } from "./components/lists-planes/lists-planes.component";
import { NewPlanComponent } from "./components/lists-planes/new-plan/new-plan.component";
import { EditPlanComponent } from "./components/lists-planes/edit-plan/edit-plan.component";
import { DeleteComponent } from "./components/delete/delete.component";
import { DeletePlanesMegaComponent } from "./components/lists-planes/delete-planes-mega/delete-planes-mega.component";
@NgModule({
  declarations: [
    AumentoMegasComponent,
    ListsComponent,
    NewComponent,
    EditComponent,
    ListsPlanesComponent,
    NewPlanComponent,
    EditPlanComponent,
    DeleteComponent,
    DeletePlanesMegaComponent,
  ],
  imports: [CommonModule, AumentoMegasRoutingModule, CoreModule],
})
export class AumentoMegasModule {}
