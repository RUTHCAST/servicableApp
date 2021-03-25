import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Category } from "../../../models/categoy.model";
// import { TypeProduct } from "../../../models/types.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];

  @Input() props: any;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.categories = this.props.categories;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      // id: new FormControl(this.props.product.id, Validators.required),
      id_categoria: new FormControl(
        { value: this.props.product.id_categoria, disabled: true },
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
    });
  }

  closeModal() {
    this.modal.close();
  }
}
