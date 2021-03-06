import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import {
  NgbActiveModal,
  NgbModalRef,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ProductoSolicitudServicio } from "../../modules/productoSolicitudServicio.model";
import { SolicitudServiciosService } from "../../services/solicitud-servicios.service";

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

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    // private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private solSrv: SolicitudServiciosService
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
    console.log(this.props);
    this.isSubmit = true;
    this.isLoading = true;
    this.spinner.show();
    if (!this.form.valid) {
      return;
    }
    const data: ProductoSolicitudServicio = {
      id: this.props.id,
      key: this.props.id,
      nombre: this.form.get("nombre").value,
    };

    this.solSrv
      .newProducto(data)
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
