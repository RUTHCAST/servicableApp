import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AumentoMegasRoutingModule } from "./aumento-megas-routing.module";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { EditComponent } from "./components/edit/edit.component";
import { AumentoMegasComponent } from "./components/aumento-megas.component";
import { CoreModule } from "../../core/core.module";

@NgModule({
  declarations: [
    AumentoMegasComponent,
    ListsComponent,
    NewComponent,
    EditComponent,
  ],
  imports: [CommonModule, AumentoMegasRoutingModule, CoreModule],
})
export class AumentoMegasModule {}
