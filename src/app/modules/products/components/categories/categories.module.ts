import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CoreModule } from "../../../../core/core.module";

import { ListComponent } from "./lists/list.component";
import { DetailsComponent } from "./details/details.component";
import { NewComponent } from "./new/new.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
  declarations: [ListComponent, DetailsComponent, NewComponent, EditComponent],
  imports: [CommonModule, CategoriesRoutingModule, NgbModalModule, CoreModule],
})
export class CategoriesModule {}
