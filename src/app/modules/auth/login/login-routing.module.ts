import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { IsNotAuthGuard } from "../../../core/guards/is-not-auth.guard";
import { RegisterComponent } from "./register/register.component";
import { SendMailVerificationComponent } from "./send-mail-verification/send-mail-verification.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [IsNotAuthGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsNotAuthGuard],
  },
  {
    path: "verificacion",
    component: SendMailVerificationComponent,
    canActivate: [IsNotAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
