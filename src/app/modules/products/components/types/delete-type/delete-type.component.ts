import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { TypesProductsService } from "../../../services/types-products.service";

@Component({
  selector: "app-delete-type",
  templateUrl: "./delete-type.component.html",
  styleUrls: ["./delete-type.component.scss"],
})
export class DeleteTypeComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private typeSrv: TypesProductsService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  verify(id: number) {
    console.log(id);
    const verify = this.props.plans.some((arrVal) => arrVal.id_tipo === id);
    console.log(verify);

    if (verify) {
      this.closeModal();
      this._route.navigate(["/productos/planes/", id]);
    } else {
      alert("Entro a borrar");
      // this.delete();
    }
  }

  delete() {
    this.isLoading = true;
    this.typeSrv
      .deleteType(this.props.type)
      .then(() => {
        this.success = true;
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
