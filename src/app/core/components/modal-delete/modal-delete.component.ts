import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductsService } from "../../../modules/products/services/products.service";

@Component({
  selector: "app-modal-delete",
  templateUrl: "./modal-delete.component.html",
  styleUrls: ["./modal-delete.component.scss"],
})
export class ModalDeleteComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private productSrv: ProductsService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.productSrv
      .deleteCategory(this.props.product)
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
