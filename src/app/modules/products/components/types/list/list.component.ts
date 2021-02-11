import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { DetailsComponent } from "../details/details.component";
import { EditComponent } from "../edit/edit.component";
import { ModalDeleteComponent } from "../../../../../core/components/modal-delete/modal-delete.component";

import { ProductsService } from "../../../services/products.service";
import { TypeProduct } from "../../../models/types.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private productSrv: ProductsService
  ) {}
  typesProduct: TypeProduct[] = [];

  ngOnInit(): void {
    this.getTypes();
  }

  onDetail(type: any): void {
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      type: type,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(type: any): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      type: type,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(type: any): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      type: type,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  getTypes(): void {
    this.productSrv
      .getAllTypes()
      .snapshotChanges()
      .subscribe((res) => {
        res.forEach((t) => {
          const typesProduct = t.payload.toJSON();
          typesProduct["key"] = t.key;
          this.typesProduct.push(typesProduct as TypeProduct);
        });

        // this.categories = data;
        console.log(this.typesProduct);
      });
  }
}
