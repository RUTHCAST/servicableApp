import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUpload } from "../../../../../core/models/fileUpload";
import { PlanProduct } from "../../../models/plans.model";
import { TypeProduct } from "../../../models/types.model";
import { PlansService } from "../../../services/plans.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  change = false;
  error = false;
  mensajeError: string;

  changeBtn = false;
  showButton = false;
  imageChanged = false;

  typesProducts: TypeProduct[] = [];
  currentFileUpload: FileUpload;
  percentage: number;

  url_image: any;
  filedataImage: File;

  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private planSrv: PlansService
  ) {}

  ngOnInit(): void {
    this.typesProducts = this.props.types;
    // console.log(this.typesProducts);
    this.createForm();
  }

  createForm() {
    // console.log(this.props.product.id_tipo);
    this.form = new FormGroup({
      id_tipo: new FormControl(this.props.product.id_tipo, Validators.required),
      nombre: new FormControl(this.props.product.nombre, Validators.required),
      precio: new FormControl(this.props.product.precio, Validators.required),
      url_image: new FormControl(""),
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
    this.url_image = "";
    this.modal.close();
  }

  fileEventUrlImage(e) {
    this.changeBtn = true;
    this.filedataImage = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url_image = event.target.result;
    };
    reader.readAsDataURL(this.filedataImage);
  }

  buttonChange() {
    this.showButton = true;
    this.imageChanged = false;
    this.changeBtn = true;
  }

  cancelImageChange() {
    this.changeBtn = false;
    this.url_image = null;
  }

  changeImage() {
    this.showButton = false;
    this.isLoading = true;
    this.spinner.show();
    const action = "update";
    const data: PlanProduct = {
      id: this.props.product.id,
      key: this.props.product.key,
      id_tipo: this.form.get("id_tipo").value,
      nombre: this.form.get("nombre").value,
      precio: this.form.get("precio").value,
    };

    this.currentFileUpload = new FileUpload(this.filedataImage);
    this.planSrv
      .deleteFileStorage(this.props.product.url_image)
      .then(() => {
        this.planSrv
          .pushImageAndSave(this.currentFileUpload, data, action)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage);
              if (this.percentage === 100) {
                this.isLoading = false;
                this.currentFileUpload = null;
                this.imageChanged = true;
                this.changeBtn = false;
                this.spinner.hide();
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

  updatePlan() {
    this.isLoading = true;
    this.spinner.show();
    const action = "update";
    const data: PlanProduct = {
      id: this.props.product.id,
      key: this.props.product.key,
      id_tipo: this.form.get("id_tipo").value,
      nombre: this.form.get("nombre").value,
      precio: this.form.get("precio").value,
      url_image: this.props.product.url_image,
    };
    // console.log("data", data);
    this.planSrv
      .updatePlan(data)
      .then(() => {
        this.isLoading = false;
        this.currentFileUpload = null;
        this.changeBtn = false;
        this.spinner.hide();
        this.success = true;
        this.error = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.spinner.hide();
      });
  }
}
