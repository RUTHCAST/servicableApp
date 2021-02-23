import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReportsComponent } from "./components/reports/reports.component";

const routes: Routes = [
  {
    path: "",
    component: ReportsComponent,
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
