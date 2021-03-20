import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SolicitudServiciosRoutingModule } from "./solicitud-servicios-routing.module";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { SolicitudServiciosComponent } from "./components/solicitud-servicios.component";
import { CoreModule } from "../../core/core.module";
import { ListsServiciosComponent } from "./components/lists-servicios/lists-servicios.component";
import { NewServicioComponent } from "./components/lists-servicios/new-servicio/new-servicio.component";
import { EditServicioComponent } from "./components/lists-servicios/edit-servicio/edit-servicio.component";
import { DeleteServiceComponent } from "./components/delete-service/delete-service.component";
// import { DeleteServiceComponent } from './components/delete-service/delete-service.component';

@NgModule({
  declarations: [
    SolicitudServiciosComponent,
    EditComponent,
    ListsComponent,
    NewComponent,
    ListsServiciosComponent,
    NewServicioComponent,
    EditServicioComponent,
    DeleteServiceComponent,
  ],
  imports: [CommonModule, SolicitudServiciosRoutingModule, CoreModule],
})
export class SolicitudServiciosModule {}
