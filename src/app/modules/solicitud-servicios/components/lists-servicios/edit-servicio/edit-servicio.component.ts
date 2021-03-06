import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioSolServicio } from "../../../modules/servicioSolServicios.model";
import { SolicitudServiciosService } from "../../../services/solicitud-servicios.service";

@Component({
  selector: "app-edit-servicio",
  templateUrl: "./edit-servicio.component.html",
  styleUrls: ["./edit-servicio.component.scss"],
})
export class EditServicioComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  showButton = false;
  success = false;
  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private solSrv: SolicitudServiciosService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl(this.props.servicio.nombre, Validators.required),
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

    const data: ServicioSolServicio = {
      key: this.props.servicio.key,
      producto_id: this.props.servicio.producto_id,
      nombre: this.form.get("nombre").value,
    };
    console.log(data);
    this.solSrv
      .updateServicio(data)
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
