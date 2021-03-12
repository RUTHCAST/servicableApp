import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDeleteComponent } from "../../../products/components/categories/modal-delete/modal-delete.component";
import { ServicioSolServicio } from "../../modules/servicioSolServicios.model";
import { SolicitudServiciosService } from "../../services/solicitud-servicios.service";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";
import { ProductoSolicitudServicio } from "../../modules/productoSolicitudServicio.model";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  productos: ProductoSolicitudServicio[] = [];

  constructor(
    private modalService: NgbModal,
    private solSrv: SolicitudServiciosService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  onEdit(producto: ProductoSolicitudServicio): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      // console.log(result);
    });
  }

  onDelete(producto: ProductoSolicitudServicio): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      // console.log(result);
    });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      id: this.productos.length,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      // console.log(result);
    });
  }

  getProductos(): void {
    this.solSrv
      .getAllProductos()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.productos.length;
        console.log(size);
        this.productos.splice(0, size);

        res.forEach((t) => {
          const producto = t.payload.toJSON();
          producto["key"] = t.key;
          this.productos.push(producto as ServicioSolServicio);
        });
        console.log(this.productos);
        // this.dtTrigger.next();
      });
  }
}
