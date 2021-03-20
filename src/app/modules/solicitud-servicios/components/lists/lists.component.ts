import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicioSolServicio } from "../../modules/servicioSolServicios.model";
import { SolicitudServiciosService } from "../../services/solicitud-servicios.service";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";
import { ProductoSolicitudServicio } from "../../modules/productoSolicitudServicio.model";
import { DeleteServiceComponent } from "../delete-service/delete-service.component";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  productos: ProductoSolicitudServicio[] = [];
  servicios: ServicioSolServicio[] = [];

  constructor(
    private modalService: NgbModal,
    private solSrv: SolicitudServiciosService
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getServicios();
  }

  onEdit(producto: ProductoSolicitudServicio): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
  }

  onDelete(producto: ProductoSolicitudServicio, message: string): void {
    const modalRef: NgbModalRef = this.modalService.open(
      DeleteServiceComponent,
      {
        size: "lg",
      }
    );
    const props = {
      product: producto,
      servicios: this.servicios,
      message,
    };
    modalRef.componentInstance.props = props;
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      id: this.productos.length,
    };
    modalRef.componentInstance.props = props;
  }

  verify(product: any) {
    console.log("ingreso a verify function");
    const verify = this.servicios.some(
      (arrVal) => arrVal.producto_id === product.id
    );
    if (verify) {
      const message =
        "El producto seleccionada tiene planes asociados, por lo que será redireccionado a la pagina de tipos de productos para que elimine cada uno de ellos.";
      this.onDelete(product, message);
    } else {
      const message =
        "Esta acción eliminara permanentemente el producto. Esta seguro de continuar?";
      this.onDelete(product, message);
    }
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
        // console.log(this.productos);
        // this.dtTrigger.next();
      });
  }

  getServicios(): void {
    this.solSrv
      .getAllServicios()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.servicios.length;
        console.log(size);
        this.servicios.splice(0, size);

        res.forEach((t) => {
          const servicio = t.payload.toJSON();
          servicio["key"] = t.key;
          this.servicios.push(servicio as ServicioSolServicio);
        });
        // this.servicios = this.servicios.filter(
        //   (dept) => dept.producto_id === this.productoId
        // );
        // console.log(this.servicios);
        // this.dtTrigger.next();
      });
  }
}
