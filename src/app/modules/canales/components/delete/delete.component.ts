import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { CanalesService } from "../../servicios/canales.service";

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
    private canalesSrv: CanalesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.spinner.show();
    this.canalesSrv
      .deleteCanal(this.props.canales)
      .then(() => {
        this.success = true;
        this.isLoading = false;
        this.spinner.hide();
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
        this.spinner.hide();
      });
  }
}
