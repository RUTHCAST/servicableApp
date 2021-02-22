import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { CarruselService } from "../../../services/carrusel.service";

@Component({
  selector: "app-delete-image",
  templateUrl: "./delete-image.component.html",
  styleUrls: ["./delete-image.component.scss"],
})
export class DeleteImageComponent implements OnInit {
  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private carruselSrv: CarruselService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log(this.props);
  }

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.spinner.show();
    // alert(this.props.key);
    this.carruselSrv
      .deleteCarrusel(this.props.carrusel)
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
