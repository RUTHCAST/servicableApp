import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import { ProductsService } from "../../../services/products.service";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { ModalConfirmationComponent } from "../../../../../core/components/modal-confirmation/modal-confirmation.component";
import { Category } from "../../../models/categoy.model";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  value = null;
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  url: any = "";
  id: any;
  showButton = false;

  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;

  @Input() props: any;
  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private productSrv: ProductsService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.id = this.props.product.id;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      url_image: new FormControl(""),
      nombre: new FormControl(this.props.product.nombre, Validators.required),
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
    this.url = "";
    this.showButton = false;
    this.modal.close();
  }

  fileEvent(e) {
    // this.selectedFiles = e.target.files;
    this.filedata = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
      // console.log(this.url);
    };
    reader.readAsDataURL(this.filedata);
  }

  changeImage() {
    this.showButton = false;
  }

  update() {
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const action = "update";
    const data: Category = {
      id: this.id,
      nombre: this.form.get("nombre").value,
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    // if (typeof this.currentFileUpload.file === "undefined") {
    //   data.url_image = this.props.product.url_image;
    // }
    this.productSrv
      .pushCategoryStorage(this.currentFileUpload, data, action)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          if (this.percentage === 100) {
            this.showButton = false;
            this.isLoading = false;
            this.currentFileUpload = null;
            this.modal.close();
            this.openModalConfirmation();
            this.spinner.hide();
          }
        },
        (error) => {
          console.log(error);
          this.showButton = false;
          this.isLoading = false;
          this.currentFileUpload = null;
          this.spinner.hide();
        }
      );
  }

  openModalConfirmation(): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ModalConfirmationComponent,
      {
        size: "lg",
      }
    );
    const props = {
      mensaje: "Categoria actualizada con exito",
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
