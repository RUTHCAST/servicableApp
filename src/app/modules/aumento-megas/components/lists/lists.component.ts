import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { PlanAumentoMegas } from "../../models/planAumentoMegas.model";
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
  planes: PlanAumentoMegas[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private aumentoMegasSrv: AumentoMegasService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 15,
      retrieve: true,
      language: {
        processing: "Procesando datos...",
        search: "Buscar",
        lengthMenu: "Mostrar _MENU_ Registros",
        info: "Mostrando _START_ de _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrar 0 &agrave; 0 sur 0 &eacute;registros",
        infoFiltered: "(Mostrar _MAX_ registros)",
        infoPostFix: "",
        loadingRecords: "Cargando datos...",
        zeroRecords: "No hay data para mostrar",
        emptyTable: "Sin registros para mostrar",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo",
        },
      },
    };
    this.getProductos();
    this.getPlanes();
  }

  onEdit(producto: ProductoAumentoMegas): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
    };
    modalRef.componentInstance.props = props;
  }

  onDelete(producto: ProductoAumentoMegas, message: string): void {
    const modalRef: NgbModalRef = this.modalService.open(DeleteComponent, {
      size: "lg",
    });
    const props = {
      product: producto,
      planes: this.planes,
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
    const verify = this.planes.some(
      (arrVal) => arrVal.producto_id === product.id
    );
    // console.log(verify);
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
        this.dtTrigger.next();
      });
  }

  getPlanes(): void {
    this.aumentoMegasSrv
      .getAllPlan()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.planes.length;
        console.log(size);
        this.planes.splice(0, size);
        res.forEach((t) => {
          const plan = t.payload.toJSON();
          plan["key"] = t.key;
          this.planes.push(plan as PlanAumentoMegas);
        });
      });
  }
}
