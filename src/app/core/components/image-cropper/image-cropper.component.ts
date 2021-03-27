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
  filedata: File;
  acceptBtn = false;
  show = false;
  config = {
    zoomable: true,
    width: 400, // Default `250`
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
      // this.filedata = (e.target as HTMLInputElement).files[0];
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
    const images = {
      cropper: this.cropperResult,
      fileData: this.base64ToFile(this.cropperResult, "croppedImage.png"),
    };
    this.modal.close(images);
  }

  cancel() {
    this.imageUrl = "../../../../../assets/img/avatars/profile.png";
    this.show = false;
    this.acceptBtn = false;
    this.modal.close();
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

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  };

  base64ToFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
