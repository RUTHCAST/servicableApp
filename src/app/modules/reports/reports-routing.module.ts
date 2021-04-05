import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

import { ReportsComponent } from "./components/reports/reports.component";

const routes: Routes = [
  {
    path: "",
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Reportes",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
