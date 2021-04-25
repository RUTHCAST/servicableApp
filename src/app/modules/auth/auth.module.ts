import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./components/register/register.component";
import { DetailsComponent } from "./components/details/details.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListsComponent } from "./components/lists/lists.component";
import { NewComponent } from "./components/new/new.component";
import { AuthComponent } from "./components/auth.component";
import { CoreModule } from "../../core/core.module";
import { AuthRoutingModuleModule } from "./auth-routing-module.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    RegisterComponent,
    DetailsComponent,
    EditComponent,
    ListsComponent,
    NewComponent,
    AuthComponent,
  ],
  imports: [CommonModule, CoreModule, AuthRoutingModuleModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
