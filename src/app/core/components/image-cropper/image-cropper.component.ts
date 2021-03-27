import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CropperComponent } from "angular-cropperjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "image-cropper",
  templateUrl: "./image-cropper.component.html",
  styleUrls: ["./image-cropper.component.scss"],
})
export class ImageCropperComponent implements OnInit {
  @ViewChild("angularCropper") angularCropper: CropperComponent;
  imageUrl: string;
  urlDefault = "../../../../../assets/img/avatars/profile.png";
  cropperResult: string;
  acceptBtn = false;
  show = false;
  config = {
    zoomable: true,
  };
  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  showLoader() {
    this.show = !this.show;
  }

  onSelectFile(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        if (this.imageUrl !== "../../../../../assets/img/avatars/profile.png") {
          this.acceptBtn = true;
        }
        this.showLoader();
      };
    }
  }

  closeModal() {
    this.modal.close(this.cropperResult);
  }

  cancel() {
    this.imageUrl = "../../../../../assets/img/avatars/profile.png";
    this.show = false;
    this.acceptBtn = false;
  }

  getCropperImage() {
    this.spinner.show();
    this.cropperResult = this.angularCropper.cropper
      .getCroppedCanvas()
      .toDataURL();
    this.spinner.hide();
    this.closeModal();
    // this.angularCropper.cropper.getCroppedCanvas().toBlob(
    //   (blob) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     reader.onload = () => {
    //       this.cropperResult = reader.result as string;
    //       this.spinner.hide();
    //     };
    //   },
    //   "image/jpg",
    //   0.95
    // );
  }

  rotateLeft() {
    this.angularCropper.cropper.rotate(-45);
  }

  rotateRight() {
    this.angularCropper.cropper.rotate(45);
  }
  zoomOut() {
    this.angularCropper.cropper.zoom(0.1);
  }

  zoomIn() {
    this.angularCropper.cropper.zoom(-0.1);
  }
}
