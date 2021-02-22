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

  categories: Category[] = [];

  currentFileUploadImg: FileUpload;
  currentFileUploadBack: FileUpload;

  url_image: any = "";
  filedataImage: File;

  url_background: any = "";
  filedatabackground: File;
  percentage: number;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
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
    this.modal.close(false);
  }

  cancel() {
    this.url_image = "";
    this.url_background = "";
    this.modal.close();
  }

  fileEventUrlImage(e) {
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
}
