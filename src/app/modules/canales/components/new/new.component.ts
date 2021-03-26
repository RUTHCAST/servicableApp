import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { v4 as uuid } from "uuid";

import {
  NgbActiveModal,
  NgbModalRef,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { FileUpload } from "../../../../core/models/fileUpload";
import { CanalesService } from "../../servicios/canales.service";
import { canales } from "../../modelos/canales.model";

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
  success = false;

  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private canalesSrv: CanalesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    console.log(this.props.canales.length);
  }

  closeModal() {
    this.modal.close(false);
  }

  createForm() {
    this.form = new FormGroup({
      categoria: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
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
    const action = "new";
    const data: canales = {
      key: uuid(),
      categoria: this.form.get("categoria").value,
      nombre: this.form.get("nombre").value + "_" + this.props.canales.length,
      createdAt: new Date(),
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.canalesSrv
      .pushCanalesStorage(this.currentFileUpload, data, action)
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
