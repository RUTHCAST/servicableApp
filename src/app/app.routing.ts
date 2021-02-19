import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./modules/auth/components/login/login.component";
import { RegisterComponent } from "./modules/auth/components/register/register.component";
import { DashboardComponent } from "./modules/dashboard/components/dashboard.component";
import { AuthComponent } from './modules/auth/components/auth.component';
import { AuthModule } from './modules/auth/auth.module';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
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
    path: "usuarios",
    component: AuthComponent,
    loadChildren: () =>
      import("./modules/auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },


  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      //     {
      //       path: "productos",
      //       loadChildren: () =>
      //         import("./modules/products/products.module").then(
      //           (m) => m.ProductsModule
      //         ),
      //     },
      //     {
      //       path: "base",
      //       loadChildren: () =>
      //         import("./views/base/base.module").then((m) => m.BaseModule),
      //     },
      //     {
      //       path: "buttons",
      //       loadChildren: () =>
      //         import("./views/buttons/buttons.module").then((m) => m.ButtonsModule),
      //     },
      //     {
      //       path: "charts",
      //       loadChildren: () =>
      //         import("./views/chartjs/chartjs.module").then((m) => m.ChartJSModule),
      //     },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      //     {
      //       path: "icons",
      //       loadChildren: () =>
      //         import("./views/icons/icons.module").then((m) => m.IconsModule),
      //     },
      //     {
      //       path: "notifications",
      //       loadChildren: () =>
      //         import("./views/notifications/notifications.module").then(
      //           (m) => m.NotificationsModule
      //         ),
      //     },
      //     {
      //       path: "theme",
      //       loadChildren: () =>
      //         import("./views/theme/theme.module").then((m) => m.ThemeModule),
      //     },
      //     {
      //       path: "widgets",
      //       loadChildren: () =>
      //         import("./views/widgets/widgets.module").then((m) => m.WidgetsModule),
      //     },
    ],
  },
  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
