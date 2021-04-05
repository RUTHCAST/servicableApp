import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { TypeProduct } from "../../../models/types.model";
import { TypesProductsService } from "../../../services/types-products.service";

@Component({
  selector: "app-edit-background",
  templateUrl: "./edit-background.component.html",
  styles: [],
})
export class EditBackgroundComponent implements OnInit {
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
    private typeSrv: TypesProductsService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close();
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

    const data: TypeProduct = {
      id: this.props.product.id,
      key: this.props.product.key,
      id_categoria: this.props.product.id_categoria,
      nombre: this.props.product.nombre,
      descripcion: this.props.product.descripcion,
      precio: this.props.product.precio,
      url_image: this.props.product.url_image,
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.typeSrv
      .deleteFileStorage(this.props.product.url_background)
      .then(() => {
        this.typeSrv
          .pushBackgroundImage(this.currentFileUpload, null, data, "update")
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
