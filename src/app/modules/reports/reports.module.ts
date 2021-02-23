import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportsRoutingModule } from "./reports-routing.module";

import { ReportsComponent } from "./components/reports/reports.component";
import { CoreModule } from "../../core/core.module";

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, CoreModule],
})
export class ReportsModule {}
