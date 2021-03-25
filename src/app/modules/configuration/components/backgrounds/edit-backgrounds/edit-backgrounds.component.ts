import { Component, Input, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { BackgroundsService } from "../../../services/backgrounds.service";
import { Background } from "../../../models/background.model";

@Component({
  selector: "app-edit-backgrounds",
  templateUrl: "./edit-backgrounds.component.html",
  styleUrls: ["./edit-backgrounds.component.scss"],
})
export class EditBackgroundsComponent implements OnInit {
  isSubmit = false;
  isLoading = false;
  url = "";
  today = new Date();

  showButton = false;
  success = false;
  imageChanged = false;

  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;

  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private backgroundSrv: BackgroundsService
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

  changeImage() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();
    const data: Background = {
      id: this.props.background.id,
      key: this.props.background.key,
      nombre: this.props.background.nombre,
      descripcion: this.props.background.descripcion,
      createdAt: new Date(),
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.backgroundSrv
      .deleteFileStorage(this.props.background.url_image)
      .then(() => {
        this.backgroundSrv
          .pushBackgroundStorage(this.currentFileUpload, data)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUpload = null;
                this.imageChanged = true;
                this.spinner.hide();
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
