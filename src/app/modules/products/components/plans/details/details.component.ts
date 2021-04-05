import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PlansService } from "../../../services/plans.service";
import { TypeProduct } from "../../../models/types.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  typesProducts: TypeProduct[] = [];

  @Input() props: any;

  constructor(public modal: NgbActiveModal, private planSrv: PlansService) {}

  ngOnInit(): void {
    // console.log(this.props);
    this.typesProducts = this.props.types;
    this.createForm();
  }

  createForm() {
    // console.log(this.props.product.id_tipo);
    this.form = new FormGroup({
      id_tipo: new FormControl(
        { value: this.props.product.id_tipo, disabled: true },
        Validators.required
      ),
      nombre: new FormControl(
        { value: this.props.product.nombre, disabled: true },
        Validators.required
      ),
      descripcion: new FormControl(
        { value: this.props.product.descripcion, disabled: true },
        Validators.required
      ),
      precio: new FormControl(
        { value: this.props.product.precio, disabled: true },
        Validators.required
      ),
      url_image: new FormControl(""),
    });
  }
  closeModal() {
    this.modal.close();
  }
}
