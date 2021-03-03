import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { DepartamentosService } from "../../../services/departamentos.service";
import { Distrito } from "../../../models/distrito.model";

@Component({
  selector: "app-new-distrito",
  templateUrl: "./new-distrito.component.html",
  styleUrls: ["./new-distrito.component.scss"],
})
export class NewDistritoComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  departamentoId: number;
  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private departamentosSrv: DepartamentosService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.departamentoId = parseInt(params.id);
    });
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
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
    this.modal.close();
  }

  closeModal() {
    this.modal.close(false);
  }

  save() {
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const data: Distrito = {
      key: this.props.id,
      departamento_id: this.props.departamento_id,
      nombre: this.form.get("nombre").value,
    };

    this.departamentosSrv
      .newDistrito(data)
      .then((resp: any) => {
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
