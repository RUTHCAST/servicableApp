import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { AumentoMegasService } from "../../../services/aumento-megas.service";
import { PlanAumentoMegas } from "../../../models/planAumentoMegas.model";

@Component({
  selector: "app-edit-plan",
  templateUrl: "./edit-plan.component.html",
  styleUrls: ["./edit-plan.component.scss"],
})
export class EditPlanComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  showButton = false;
  success = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      productoId: new FormControl(
        this.props.plan.producto_id,
        Validators.required
      ),
      nombre: new FormControl(this.props.plan.nombre, Validators.required),
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
    this.modal.close();
  }

  cancel() {
    this.showButton = false;
    this.modal.close();
  }

  edit() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();

    const data: PlanAumentoMegas = {
      key: this.props.plan.key,
      producto_id: this.form.get("productoId").value,
      nombre: this.form.get("nombre").value,
    };
    console.log(data);
    this.aumentoMegasSrv
      .updatePlanes(data)
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
