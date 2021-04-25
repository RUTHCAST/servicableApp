import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../../core/core.module";

import { LoginRoutingModule } from "./login-routing.module";

import { LoginComponent } from "./login.component";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule
  ],
})
export class LoginModule {}
