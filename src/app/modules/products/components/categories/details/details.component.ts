import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "../../../services/products.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  value = null;

  @Input() props: any;
  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    private productSrv: ProductsService
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    console.log(this.props);
  }

  closeModal() {
    this.modal.close(false);
  }
}
