import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SolicitudServiciosRoutingModule } from "./solicitud-servicios-routing.module";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { SolicitudServiciosComponent } from "./components/solicitud-servicios.component";

@NgModule({
  declarations: [
    SolicitudServiciosComponent,
    EditComponent,
    ListsComponent,
    NewComponent,
  ],
  imports: [CommonModule, SolicitudServiciosRoutingModule],
})
export class SolicitudServiciosModule {}
