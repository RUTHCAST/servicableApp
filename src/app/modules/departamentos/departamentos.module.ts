import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepartamentosRoutingModule } from "./departamentos-routing.module";

import { DepartamentosComponent } from "./departamentos.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { EditComponent } from "./components/edit/edit.component";
import { CoreModule } from "../../core/core.module";

import { ListsDistritosComponent } from "./components/lists-distritos/lists-distritos.component";
import { NewDistritoComponent } from "./components/lists-distritos/new-distrito/new-distrito.component";
import { EditDistritoComponent } from "./components/lists-distritos/edit-distrito/edit-distrito.component";
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';
import { DeleteDistritoComponent } from './components/lists-distritos/delete-distrito/delete-distrito.component';

@NgModule({
  declarations: [
    DepartamentosComponent,
    ListsComponent,
    NewComponent,
    EditComponent,
    ListsDistritosComponent,
    NewDistritoComponent,
    EditDistritoComponent,
    DeleteDepartmentComponent,
    DeleteDistritoComponent,
  ],
  imports: [CommonModule, DepartamentosRoutingModule, CoreModule],
})
export class DepartamentosModule {}
