import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { EditComponent } from "../edit/edit.component";
import { DetailsComponent } from "../details/details.component";
import { ModalDeleteComponent } from "../../../../../core/components/modal-delete/modal-delete.component";
import { NewComponent } from "../new/new.component";

import { ProductsService } from "../../../services/products.service";
import { Category } from "../../../models/categoy.model";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  categories: Category[] = [];

  constructor(
    private routes: Router,
    private modalService: NgbModal,
    private productSrv: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategorys();
  }

  onDetail(product: any): void {
    // this.navigationExtras.state.value = product;
    // this.routes.navigate(["/productos/nueva"], this.navigationExtras);
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      product: product,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(product: any): void {
    // this.navigationExtras.state.value = product;
    // this.routes.navigate(["/productos/editar"], this.navigationExtras);
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: product,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(product: any): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      product: product,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      id: this.categories.length,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  getCategorys(): void {
    this.productSrv
      .getAllCategories()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.categories.length;
        console.log(size);
        this.categories.splice(1, size);

        res.forEach((t) => {
          const category = t.payload.toJSON();
          category["key"] = t.key;
          this.categories.push(category as Category);
        });

        // this.categories = data;
        console.log(this.categories.length);
      });
  }

  getCategory(id) {
    console.log(id);
  }
}
