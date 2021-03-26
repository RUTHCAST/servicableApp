import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";

import { ModalConfirmationComponent } from "./components/modal-confirmation/modal-confirmation.component";
import { ImageCropperComponent } from "./components/image-cropper/image-cropper.component";
@NgModule({
  declarations: [ModalConfirmationComponent, ImageCropperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    DataTablesModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    DataTablesModule,
    ImageCropperComponent,
  ],
})
export class CoreModule {}
