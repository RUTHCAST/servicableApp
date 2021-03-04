import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { AumentoMegasService } from "../../services/aumento-megas.service";
import { ProductoAumentoMegas } from "../../models/productoAumentoMegas.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
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
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl(this.props.product.nombre, Validators.required),
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

    const data: ProductoAumentoMegas = {
      id: this.props.product.id,
      key: this.props.product.key,
      nombre: this.form.get("nombre").value,
    };

    this.aumentoMegasSrv
      .updateProducto(data)
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
