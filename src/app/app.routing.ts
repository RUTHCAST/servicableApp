import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./modules/auth/components/login/login.component";
import { RegisterComponent } from "./modules/auth/components/register/register.component";
import { DashboardComponent } from "./modules/dashboard/components/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "productos",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "registro",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "productos",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/products/products.module").then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [],
  },
  {
    path: "configuracion",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/configuration/configuration.module").then(
        (m) => m.ConfigurationModule
      ),
  },
  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
