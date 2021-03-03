import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { DepartamentosService } from "../../../services/departamentos.service";
import { Distrito } from "../../../models/distrito.model";

@Component({
  selector: "app-edit-distrito",
  templateUrl: "./edit-distrito.component.html",
  styleUrls: ["./edit-distrito.component.scss"],
})
export class EditDistritoComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  showButton = false;
  success = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private departSrv: DepartamentosService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl(this.props.distrito.nombre, Validators.required),
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
    this.showButton = false;
    this.modal.close();
  }

  edit() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();

    const data: Distrito = {
      key: this.props.distrito.key,
      departamento_id: this.props.distrito.departamento_id,
      nombre: this.form.get("nombre").value,
    };
    console.log(data);
    this.departSrv
      .updateDistrito(data)
      .then((resp: any) => {
        console.log(resp);
        this.isLoading = false;
        this.success = true;
        this.spinner.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.isLoading = false;
        this.spinner.hide();
        this.success = true;
      });
  }
}
