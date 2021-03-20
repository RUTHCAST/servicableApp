import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudServiciosService } from "../../../services/solicitud-servicios.service";

@Component({
  selector: "app-delete-services",
  templateUrl: "./delete-services.component.html",
  styleUrls: ["./delete-services.component.scss"],
})
export class DeleteServicesComponent implements OnInit {
  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private serSrv: SolicitudServiciosService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.serSrv
      .deleteServicios(this.props.product.key)
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
