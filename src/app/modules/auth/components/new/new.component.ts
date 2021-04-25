import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { NgbModalRef, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuid } from "uuid";
import { FileUpload } from '../../../../core/models/fileUpload';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { ConfirmedValidator } from '../../../../core/validators/confirm-password.validator';
import { ImageCropperComponent } from '../../../../core/components/image-cropper/image-cropper.component';
import { Usuario } from '../../models/usuario.model';

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
  passVisibility = "off";
  error = "";
  url = "../../../../../assets/img/avatars/profile.png";

  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;

  constructor(
    private userSrv: UsersService,
    private loginSrv: LoginService,
    private route: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        correo: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
          [this.loginSrv.usernameValidator()],
        ],
        clave: [
          "",
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(5),
          ],
        ],
        confirm_password: ["", Validators.required],
      },
      {
        validator: ConfirmedValidator("clave", "confirm_password"),
      }
    );
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

  get f() {
    return this.form.controls;
  }

  uploadImage(): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ImageCropperComponent,
      {
        size: "lg",
      }
    );
    modalRef.result.then((result) => {
      if (result) {
        this.url = result.cropper;
        this.filedata = result.fileData;
      }
      console.log(result);
    });
  }

  register() {
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    console.log(typeof this.filedata);
    if (!this.form.valid || typeof this.filedata == "undefined") {
      return;
    }
    const action = "new";
    const data: Usuario = {
      // id: this.props.id,
      key: uuid(),
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      correo: this.form.get("correo").value,
      clave: this.form.get("clave").value,
      confirm_password: this.form.get("confirm_password").value,
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.userSrv
      .pushUserStorage(this.currentFileUpload, data, action)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          if (this.percentage === 100) {
            this.isLoading = false;
            this.currentFileUpload = null;
            this.success = true;
            this.spinner.hide();
            this.route.navigate(["/login/verification"]);
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

  closeModal() {
    this.modal.close(false);
  }
}
