import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { Category } from "../../../models/categoy.model";

import { TypesProductsService } from "../../../services/types-products.service";
import { TypeProduct } from "../../../models/types.model";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"],
})
export class NewComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;

  categories: Category[] = [];

  currentFileUploadImg: FileUpload;
  currentFileUploadBack: FileUpload;

  url_image: any = "";
  filedataImage: File;

  url_background: any = "";
  filedatabackground: File;
  percentage: number;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private typeSrv: TypesProductsService
  ) {}

  @Input() props: any;
  ngOnInit(): void {
    this.categories = this.props.categories;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id_categoria: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      precio: new FormControl("", Validators.required),
      url_image: new FormControl("", Validators.required),
      url_background: new FormControl("", Validators.required),
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
    this.modal.close(false);
  }

  fileEventUrlImage(e) {
    this.filedataImage = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url_image = event.target.result;
      // console.log(this.url_image);
    };
    reader.readAsDataURL(this.filedataImage);
  }

  fileEventUrlBackground(e) {
    this.filedatabackground = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url_background = event.target.result;
      // console.log(this.url_background);
    };
    reader.readAsDataURL(this.filedatabackground);
  }

  cancel() {
    this.url_image = "";
    this.url_background = "";
    this.modal.close();
  }

  save() {
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const idType = this.props.categories.length;
    const type: TypeProduct = {
      id: this.props.categories.length,
      id_categoria: parseInt(this.form.get("id_categoria").value),
      nombre: this.form.get("nombre").value,
      descripcion: this.form.get("descripcion").value,
      precio: this.form.get("precio").value,
    };

    this.currentFileUploadImg = new FileUpload(this.filedataImage);
    this.currentFileUploadBack = new FileUpload(this.filedatabackground);

    this.typeSrv
      .pushBackgroundImage(
        this.currentFileUploadImg,
        this.currentFileUploadBack,
        type
      )
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          if (this.percentage === 100) {
            this.isLoading = false;
            this.currentFileUploadImg = null;
            this.currentFileUploadImg = null;
            this.success = true;
            this.spinner.hide();
          }
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.currentFileUploadImg = null;
          this.currentFileUploadImg = null;
          this.spinner.hide();
          this.success = true;
        }
      );
  }
}
