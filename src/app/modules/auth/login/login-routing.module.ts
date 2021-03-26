import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { IsNotAuthGuard } from "../../../core/guards/is-not-auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [IsNotAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
