import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { FileUpload } from "../../../../../core/models/fileUpload";
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"],
})
export class NewComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  url: any = "";

  // selectedFiles: FileList;
  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private productSrv: ProductsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  closeModal() {
    this.modal.close(false);
  }

  createForm() {
    this.form = new FormGroup({
      url_image: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
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
    const categoryName = this.form.get("nombre").value;
    const id = this.props.id;
    this.currentFileUpload = new FileUpload(this.filedata);
    this.productSrv
      .pushCategoryStorage(this.currentFileUpload, categoryName, id)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          this.isLoading = false;
          this.currentFileUpload = null;
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.currentFileUpload = null;
          this.spinner.hide();
        }
      );
  }
}
