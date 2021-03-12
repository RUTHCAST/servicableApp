import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { ModalDeleteComponent } from "../../../products/components/categories/modal-delete/modal-delete.component";
import { ProductoAumentoMegas } from "../../models/productoAumentoMegas.model";
import { AumentoMegasService } from "../../services/aumento-megas.service";
import { DeleteComponent } from "../delete/delete.component";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  productos: ProductoAumentoMegas[] = [];

  constructor(
    private modalService: NgbModal,
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  onEdit(producto: ProductoAumentoMegas): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
    // modalRef.result.then((result) => {
    //   // console.log(result);
    // });
  }

  onDelete(producto: ProductoAumentoMegas): void {
    const modalRef: NgbModalRef = this.modalService.open(DeleteComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
    // modalRef.result.then((result) => {
    //   // console.log(result);
    // });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      id: this.productos.length,
    };
    modalRef.componentInstance.props = props;
    // modalRef.result.then((result) => {
    //   // console.log(result);
    // });
  }

  getProductos(): void {
    this.aumentoMegasSrv
      .getAllProductos()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.productos.length;
        console.log(size);
        this.productos.splice(0, size);

        res.forEach((t) => {
          const producto = t.payload.toJSON();
          producto["key"] = t.key;
          this.productos.push(producto as ProductoAumentoMegas);
        });
        console.log(this.productos);
        // this.dtTrigger.next();
      });
  }
}
