import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { ServicioSolServicio } from "../../modules/servicioSolServicios.model";
import { SolicitudServiciosService } from "../../services/solicitud-servicios.service";

@Component({
  selector: "app-delete-service",
  templateUrl: "./delete-service.component.html",
  styleUrls: ["./delete-service.component.scss"],
})
export class DeleteServiceComponent implements OnInit {
  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private _route: Router,
    private serSrv: SolicitudServiciosService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  verify(id: number) {
    const verify = this.props.servicios.some(
      (arrVal) => arrVal.producto_id === id
    );

    if (verify) {
      this.closeModal();
      this._route.navigate(["/solicitud-servicios/servicios/", id]);
    } else {
      // alert("ELIMINAR");
      this.delete();
    }
  }

  delete() {
    this.isLoading = true;
    this.serSrv
      .deleteProductos(this.props.product.key)
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
