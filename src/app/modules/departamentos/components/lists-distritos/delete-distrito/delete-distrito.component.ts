import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudServiciosService } from "../../../../solicitud-servicios/services/solicitud-servicios.service";
import { DepartamentosService } from "../../../services/departamentos.service";

@Component({
  selector: "app-delete-distrito",
  templateUrl: "./delete-distrito.component.html",
  styleUrls: ["./delete-distrito.component.scss"],
})
export class DeleteDistritoComponent implements OnInit {
  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private departamentosSrv: DepartamentosService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.departamentosSrv
      .deleteDistrito(this.props.product.key)
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
