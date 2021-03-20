import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AumentoMegasService } from "../../../services/aumento-megas.service";

@Component({
  selector: "app-delete-planes-mega",
  templateUrl: "./delete-planes-mega.component.html",
  styleUrls: ["./delete-planes-mega.component.scss"],
})
export class DeletePlanesMegaComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;

  constructor(
    public modal: NgbActiveModal,
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {}
  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.aumentoMegasSrv
      .deletePlanes(this.props.plan.key)
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
