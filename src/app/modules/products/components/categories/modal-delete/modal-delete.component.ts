import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CategoriesService } from "../../../services/categories.service";

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
    private categoriesSrv: CategoriesService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  verify(id: number) {
    console.log(id);
    const verify = this.props.types.some(
      (arrVal) => arrVal.id_categoria === id
    );

    if (verify) {
      this.closeModal();
      this._route.navigate(["/productos/tipos/", id]);
    } else {
      this.delete();
    }
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
