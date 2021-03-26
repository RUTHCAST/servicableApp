import { Component, Input, OnInit } from "@angular/core";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import { NgxSpinnerService } from "ngx-spinner";
import { FileUpload } from "../../../../core/models/fileUpload";
import { canales } from "../../modelos/canales.model";
import { CanalesService } from "../../servicios/canales.service";
import { Carrusel } from "../../../configuration/models/carrusel.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  public isSubmit = false;
  public isLoading = false;
  public url = "";
  public today = new Date();

  public showButton = false;
  public success = false;
  public imageChanged = false;

  public currentFileUpload: FileUpload;
  public filedata: File;
  public percentage: number;

  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private canalSrv: CanalesService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      categoria: new FormControl(
        this.props.canal.categoria,
        Validators.required
      ),
      // nombre: new FormControl(this.props.canal.nombre, Validators.required),
      // url: new FormControl("", Validators.required),
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
    this.url = "";
    this.showButton = false;
    this.modal.close();
  }

  fileEvent(e) {
    this.filedata = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.readAsDataURL(this.filedata);
  }

  buttonChange() {
    this.showButton = true;
    this.imageChanged = false;
  }

  edit() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();

    const data: canales = {
      categoria: this.form.get("categoria").value,
      nombre: this.props.canal.nombre,
      key: this.props.canal.key,
      createdAt: new Date(),
    };

    this.canalSrv
      .updateCanal(data)
      .then(() => {
        console.log("Modificada exitosamente");
        this.success = true;
        this.isLoading = false;
        this.spinner.hide();
      })
      .catch((err: any) => {
        console.log(err);
        this.success = true;
        this.isLoading = false;
        this.spinner.hide();
      });
  }

  changeImage() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();
    const data: canales = {
      categoria: this.form.get("categoria").value,
      nombre: this.props.canal.nombre,
      key: this.props.canal.key,
      createdAt: new Date(),
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.canalSrv
      .deleteFileStorage(this.props.canal.url)
      .then(() => {
        this.canalSrv
          .pushCanalesStorage(this.currentFileUpload, data, "update")
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUpload = null;
                this.imageChanged = true;
                this.spinner.hide();
                this.success = true;
              }
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
              this.currentFileUpload = null;
              this.spinner.hide();
            }
          );
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
