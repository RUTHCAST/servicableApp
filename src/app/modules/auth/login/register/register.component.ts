import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { LoginService } from "../../services/login.service";
import { ConfirmedValidator } from "../../../../core/validators/confirm-password.validator";
import { ImageCropperComponent } from "../../../../core/components/image-cropper/image-cropper.component";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  passVisibility = "off";
  error = "";
  url = "../../../../../assets/img/avatars/profile.png";

  constructor(
    private loginSrv: LoginService,
    private route: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
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
    // const props = {
    //   user,
    // };
    // modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      if (result) {
        this.url = result;
      }
      console.log(result);
    });
  }

  register() {}
}
