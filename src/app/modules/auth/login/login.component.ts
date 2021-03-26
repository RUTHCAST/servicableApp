import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  passVisibility = "off";

  constructor(
    private spinner: NgxSpinnerService,
    private loginSrv: LoginService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      clave: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(5),
      ]),
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

  login() {
    if (!this.form.valid) {
      return;
    }
    this.loginSrv.login(
      this.form.get("email").value,
      this.form.get("clave").value
    );
    // .then((resp: any) => {
    //   console.log(resp);
    // })
    // .catch((err: any) => {
    //   console.log(err);
    // });
    console.log(this.form.value);
  }
}
