import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { TypesProductsService } from "../../../services/types-products.service";
import { TypeProduct } from "../../../models/types.model";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { PlanProduct } from "../../../models/plans.model";
import { PlansService } from "../../../services/plans.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"],
})
export class NewComponent implements OnInit {
  typesProduct: TypeProduct[] = [];
  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private planSrv: PlansService
  ) {}
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  url: any = "";
  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;
  success = false;

  ngOnInit(): void {
    this.typesProduct = this.props.types;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id_tipo: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      precio: new FormControl("", Validators.required),
      url_image: new FormControl("", Validators.required),
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

  cancel() {
    this.url = "";
    this.modal.close();
  }

  closeModal() {
    this.modal.close();
  }

  fileEvent(e) {
    // this.selectedFiles = e.target.files;
    this.filedata = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
      console.log(this.url);
    };
    reader.readAsDataURL(this.filedata);
  }

  save() {
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const action = "new";
    const plans: PlanProduct = {
      id: this.props.id,
      id_tipo: this.form.get("id_tipo").value,
      nombre: this.form.get("nombre").value,
      precio: this.form.get("precio").value,
      url_image: this.form.get("url_image").value,
    };
    this.currentFileUpload = new FileUpload(this.filedata);
    this.planSrv
      .pushImageAndSave(this.currentFileUpload, plans, action)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          if (this.percentage === 100) {
            this.isLoading = false;
            this.currentFileUpload = null;
            this.success = true;
            this.spinner.hide();
          }
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.currentFileUpload = null;
          this.spinner.hide();
          this.success = true;
        }
      );
  }
}
