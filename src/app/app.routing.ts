import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

// import { P404Component } from "./views/error/404.component";
// import { P500Component } from "./views/error/500.component";
import { RegisterComponent } from "./modules/auth/components/register/register.component";
<<<<<<< HEAD
import { DashboardComponent } from "./modules/dashboard/components/dashboard.component";
import { AuthComponent } from "./modules/auth/components/auth.component";
import { AuthModule } from "./modules/auth/auth.module";
import { ReportsComponent } from "./modules/reports/components/reports/reports.component";
=======
>>>>>>> main

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/auth/login/login.module").then((m) => m.LoginModule),
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
    path: "usuarios",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
<<<<<<< HEAD
    
=======
>>>>>>> main
    path: "reportes",
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
  {
    path: "departamentos",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/departamentos/departamentos.module").then(
        (m) => m.DepartamentosModule
      ),
  },
  {
    path: "aumento-megas",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/aumento-megas/aumento-megas.module").then(
        (m) => m.AumentoMegasModule
      ),
  },
  {
    path: "solicitud-servicios",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/solicitud-servicios/solicitud-servicios.module").then(
        (m) => m.SolicitudServiciosModule
      ),
  },

  {
    path: "canales",
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import("./modules/canales/canales.module").then((m) => m.CanalesModule),
  },

  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
