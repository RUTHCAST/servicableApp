import { Component, Input, OnInit } from "@angular/core";
import { CarruselService } from "../../../services/carrusel.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import { NgxSpinnerService } from "ngx-spinner";

import { FileUpload } from "../../../../../core/models/fileUpload";
import { Carrusel } from "../../../models/carrusel.model";
// import { CarruselService } from '../../../services/carrusel.service';

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"],
})
export class EditImageComponent implements OnInit {
  public isSubmit = false;
  public isLoading = false;
  public url = "";
  public today = new Date();

  public showButton = false;
  public success = false;
  public imageChanged = false;

  public currentFileUpload: FileUpload;
  public filedata: File;
  public percentage: number;

  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private carruselSrv: CarruselService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  cancel() {
    this.url = "";
    this.showButton = false;
    this.modal.close();
  }

  fileEvent(e) {
    this.filedata = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.readAsDataURL(this.filedata);
  }

  buttonChange() {
    this.showButton = true;
    this.imageChanged = false;
  }

  edit() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();
    const data: Carrusel = {
      id: this.props.carrusel.id,
      key: this.props.carrusel.key,
      nombre: this.props.carrusel.nombre,
      createdAt: new Date(),
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.carruselSrv
      .deleteFileStorage(this.props.carrusel.url_image)
      .then(() => {
        this.carruselSrv
          .pushCarruselStorage(this.currentFileUpload, data, "update")
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUpload = null;
                this.imageChanged = true;
                this.spinner.hide();
                this.success = true;
              }
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
              this.currentFileUpload = null;
              this.spinner.hide();
            }
          );
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
