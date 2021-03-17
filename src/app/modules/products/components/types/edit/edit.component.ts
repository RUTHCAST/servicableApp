import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { Category } from "../../../models/categoy.model";

import { TypesProductsService } from "../../../services/types-products.service";
import { TypeProduct } from "../../../models/types.model";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  change = false;
  error = false;
  mensajeError: string;

  changeBtn = false;

  categories: Category[] = [];

  currentFileUploadImg: FileUpload;
  currentFileUploadBack: FileUpload;

  url_image: any;
  filedataImage: File;

  url_background: any = "";
  filedatabackground: File;
  percentage: number;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private typeSrv: TypesProductsService
  ) {}

  ngOnInit(): void {
    this.categories = this.props.categories;
    this.createForm();
    console.log(this.props.product);
  }

  createForm() {
    this.form = new FormGroup({
      // id: new FormControl(this.props.product.id, Validators.required),
      id_categoria: new FormControl(
        this.props.product.id_categoria,
        Validators.required
      ),
      nombre: new FormControl(this.props.product.nombre, Validators.required),
      descripcion: new FormControl(
        this.props.product.descripcion,
        Validators.required
      ),
      precio: new FormControl(this.props.product.precio, Validators.required),
      url_image: new FormControl(""),
      url_background: new FormControl(""),
    });
  }

  onInvalidField(fieldTag) {
    return (
      this.form.get(fieldTag).invalid &&
      (this.isSubmit || this.form.get(fieldTag).touched)
    );
  }

  onValidator(fieldTag: string, validatorTag: string) {
    const field = this.form.controls[fieldTag];
    return (
      field.errors &&
      field.errors[validatorTag] &&
      (this.isSubmit || field.touched)
    );
  }

  closeModal() {
    this.modal.close();
  }

  cancel() {
    this.url_image = "";
    this.url_background = "";
    this.modal.close();
  }

  changeImage() {
    this.changeBtn = true;
  }

  cancelImageChange() {
    this.changeBtn = false;
    this.url_image = null;
  }

  fileEventUrlImage(e) {
    this.changeBtn = true;
    this.filedataImage = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url_image = event.target.result;
    };
    reader.readAsDataURL(this.filedataImage);
  }

  fileEventUrlBackground(e) {
    this.filedatabackground = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url_background = event.target.result;
    };
    reader.readAsDataURL(this.filedatabackground);
  }

  updateType() {
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const data: TypeProduct = {
      id: this.props.product.id,
      key: this.props.product.key,
      id_categoria: this.form.get("id_categoria").value,
      nombre: this.form.get("nombre").value,
      descripcion: this.form.get("descripcion").value,
      precio: this.form.get("precio").value,
      url_image: this.props.product.url_image,
      url_background: this.props.product.url_background,
    };

    this.typeSrv
      .updateType(data)
      .then((res: any) => {
        console.log(res);
        this.success = true;
        this.isLoading = false;
        this.spinner.hide();
      })
      .catch((err: any) => {
        console.log(err);
        this.error = true;
        this.isLoading = false;
        this.success = false;
        this.spinner.hide();
      });
  }

  saveImage() {
    this.isLoading = true;
    this.spinner.show();
    const action = "update";
    const data: TypeProduct = {
      id: this.props.product.id,
      key: this.props.product.key,
      id_categoria: this.form.get("id_categoria").value,
      nombre: this.form.get("nombre").value,
      descripcion: this.form.get("descripcion").value,
      precio: this.form.get("precio").value,
      url_background: this.props.product.url_background,
    };
    console.log("data", data);
    this.currentFileUploadImg = new FileUpload(this.filedataImage);
    this.typeSrv
      .deleteFileStorage(this.props.product.url_image)
      .then(() => {
        this.typeSrv
          .pushImageAndSave(this.currentFileUploadImg, data, action)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUploadImg = null;
                this.changeBtn = true;
                this.spinner.hide();
                this.changeBtn = false;
              }
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
              this.currentFileUploadImg = null;
              this.spinner.hide();
            }
          );
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
