import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesService } from "../../../modules/products/services/categories.service";

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
    private categoriesSrv: CategoriesService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.categoriesSrv
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
