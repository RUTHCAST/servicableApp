import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";

import { ModalDeleteComponent } from "./components/modal-delete/modal-delete.component";
@NgModule({
  declarations: [ModalDeleteComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule],
  exports: [ReactiveFormsModule, FormsModule, NgxSpinnerModule],
})
export class CoreModule {}
