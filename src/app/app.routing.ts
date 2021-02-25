import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./modules/auth/components/login/login.component";
import { RegisterComponent } from "./modules/auth/components/register/register.component";
import { DashboardComponent } from "./modules/dashboard/components/dashboard.component";
<<<<<<< HEAD
import { AuthComponent } from "./modules/auth/components/auth.component";
import { AuthModule } from "./modules/auth/auth.module";
=======
import { ReportsComponent } from "./modules/reports/components/reports/reports.component";
>>>>>>> main

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
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
<<<<<<< HEAD
    path: "usuarios",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },

  {
    path: "",
=======
    path: "reportes",
>>>>>>> main
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "configuracion",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/configuration/configuration.module").then(
        (m) => m.ConfigurationModule
      ),
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
