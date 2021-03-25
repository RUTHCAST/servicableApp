import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlansRoutingModule } from "./plans-routing.module";

import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { EditComponent } from "./edit/edit.component";
import { DetailsComponent } from "./details/details.component";
import { CoreModule } from "../../../../core/core.module";
import { DeletePlanComponent } from "./delete-plan/delete-plan.component";

@NgModule({
  declarations: [
    ListComponent,
    NewComponent,
    EditComponent,
    DetailsComponent,
    DeletePlanComponent,
  ],
  imports: [CommonModule, PlansRoutingModule, CoreModule],
})
export class PlansModule {}
