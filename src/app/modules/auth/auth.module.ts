import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../core/core.module";

import { RegisterComponent } from "./components/register/register.component";
import { DetailsComponent } from "./components/details/details.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { AuthComponent } from "./components/auth.component";

import { AuthRoutingModuleModule } from "./auth-routing-module.module";
@NgModule({
  declarations: [
    RegisterComponent,
    DetailsComponent,
    EditComponent,
    ListsComponent,
    NewComponent,
    AuthComponent,
  ],
  imports: [CommonModule, CoreModule, AuthRoutingModuleModule],
})
export class AuthModule {}
