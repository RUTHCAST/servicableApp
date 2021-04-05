import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducer";
import * as actions from "../../../store/actions";
import { Usuario } from "../models/usuario.model";

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
  error = "";

  constructor(
    private spinner: NgxSpinnerService,
    private loginSrv: LoginService,
    private route: Router,
    private store: Store<AppState>
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
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }

    const response = this.loginSrv.login(
      this.form.get("email").value,
      this.form.get("clave").value
    );

    if (response.user != null) {
      localStorage.setItem("user", JSON.stringify(response.user[0]));
      const user: Usuario = response.user[0];
      this.store.dispatch(actions.setUser({ user }));
      this.route.navigate(["dashboard"]);
    } else {
      this.error = response.error;
    }
    this.spinner.hide();
  }
}
