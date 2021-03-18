import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { v4 as uuid } from "uuid";
import { NgxSpinnerService } from "ngx-spinner";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import { ModalConfirmationComponent } from "../../../../../core/components/modal-confirmation/modal-confirmation.component";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { Category } from "../../../models/categoy.model";
import { CategoriesService } from "../../../services/categories.service";
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
  url: any = null;
  id: any;
  showButton = false;
  success = false;
  imageChanged = false;

  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;

  @Input() props: any;
  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private categoriesSrv: CategoriesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.id = this.props.product.id;
    console.log(this.props.product.key);
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

  cancelChangeImage() {
    this.url = null;
    this.showButton = false;
  }

  cancel() {
    this.url = null;
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
    this.isLoading = true;
    this.spinner.show();
    const action = "update";
    const data: Category = {
      id: this.id,
      key: this.props.product.key,
      nombre: this.form.get("nombre").value,
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.categoriesSrv
      .deleteFileStorage(this.props.product.url_image)
      .then(() => {
        this.categoriesSrv
          .pushCategoryStorage(this.currentFileUpload, data, action)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUpload = null;
                this.imageChanged = true;
                this.url = null;
                this.spinner.hide();
              }
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
              this.currentFileUpload = null;
              this.url = null;
              this.spinner.hide();
            }
          );
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  update() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();
    const data: Category = {
      id: this.id,
      key: this.props.product.key,
      nombre: this.form.get("nombre").value,
    };
    this.categoriesSrv
      .updateCategory(data)
      .then(() => {
        console.log("Modificada exitosamente");
        this.success = true;
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.success = true;
        this.isLoading = false;
      });
  }

  buttonChange() {
    this.showButton = true;
    this.imageChanged = false;
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
