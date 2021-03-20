import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { AumentoMegasService } from "../../services/aumento-megas.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
})
export class DeleteComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private _route: Router,
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {}
  closeModal() {
    this.modal.close(false);
  }

  verify(id: number) {
    const verify = this.props.planes.some(
      (arrVal) => arrVal.producto_id === id
    );

    if (verify) {
      this.closeModal();
      this._route.navigate(["/aumento-megas/planes/", id]);
    } else {
      // alert("ELIMINAR");
      this.delete();
    }
  }

  delete() {
    this.isLoading = true;
    this.aumentoMegasSrv
      .deleteProduct(this.props.product.key)
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
