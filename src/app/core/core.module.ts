import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";
import { AngularCropperjsModule } from "angular-cropperjs";

import { ModalConfirmationComponent } from "./components/modal-confirmation/modal-confirmation.component";
import { ImageCropperComponent } from "./components/image-cropper/image-cropper.component";
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
@NgModule({
  declarations: [ModalConfirmationComponent, ImageCropperComponent, ImageDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    DataTablesModule,
    AngularCropperjsModule,
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
