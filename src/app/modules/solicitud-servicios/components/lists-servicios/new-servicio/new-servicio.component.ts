import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { v4 as uuid } from "uuid";
import { SolicitudServiciosService } from "../../../services/solicitud-servicios.service";
import { ServicioSolServicio } from "../../../modules/servicioSolServicios.model";

@Component({
  selector: "app-new-servicio",
  templateUrl: "./new-servicio.component.html",
  styleUrls: ["./new-servicio.component.scss"],
})
export class NewServicioComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private solSrv: SolicitudServiciosService,
    private spinner: NgxSpinnerService
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
    const data: ServicioSolServicio = {
      key: uuid(),
      producto_id: this.props.productoId,
      nombre: this.form.get("nombre").value,
    };

    this.solSrv
      .newServicio(data)
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
