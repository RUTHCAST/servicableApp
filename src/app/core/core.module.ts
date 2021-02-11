import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ModalDeleteComponent } from "./components/modal-delete/modal-delete.component";
@NgModule({
  declarations: [ModalDeleteComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule],
})
export class CoreModule {}
