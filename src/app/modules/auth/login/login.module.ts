import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { CoreModule } from "../../../core/core.module";
import { RegisterComponent } from './register/register.component';
import { SendMailVerificationComponent } from './send-mail-verification/send-mail-verification.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SendMailVerificationComponent],
  imports: [CommonModule, LoginRoutingModule, CoreModule],
})
export class LoginModule {}
