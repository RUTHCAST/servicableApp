import { Route } from "@angular/compiler/src/core";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { EditComponent } from "../edit/edit.component";
import { DetailsComponent } from "../details/details.component";
import { ModalDeleteComponent } from "../../../../../core/components/modal-delete/modal-delete.component";
import { NewComponent } from "../new/new.component";
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
  constructor(private routes: Router, private modalService: NgbModal) {}

  ngOnInit(): void {}

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
  }
}
