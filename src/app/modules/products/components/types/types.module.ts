import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TypesRoutingModule } from "./types-routing.module";
import { CoreModule } from "../../../../core/core.module";

import { DetailsComponent } from "./details/details.component";
import { NewComponent } from "./new/new.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent, DetailsComponent, NewComponent, EditComponent],
  imports: [CommonModule, TypesRoutingModule, TypesRoutingModule, CoreModule],
})
export class TypesModule {}
