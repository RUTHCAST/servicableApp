import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { v4 as uuid } from "uuid";

import { AumentoMegasService } from "../../../services/aumento-megas.service";
import { PlanAumentoMegas } from "../../../models/planAumentoMegas.model";

@Component({
  selector: "app-new-plan",
  templateUrl: "./new-plan.component.html",
  styleUrls: ["./new-plan.component.scss"],
})
export class NewPlanComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  productoId: number;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private aumentoMegasSrv: AumentoMegasService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    const data: PlanAumentoMegas = {
      id: this.props.id,
      key: uuid(),
      producto_id: this.props.productoId,
      nombre: this.form.get("nombre").value,
    };

    this.aumentoMegasSrv
      .newPlan(data)
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
