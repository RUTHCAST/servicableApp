import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ProductoSolicitudServicio } from "../../modules/productoSolicitudServicio.model";
import { ServicioSolServicio } from "../../modules/servicioSolServicios.model";
import { SolicitudServiciosService } from "../../services/solicitud-servicios.service";
import { EditServicioComponent } from "./edit-servicio/edit-servicio.component";
import { NewServicioComponent } from "./new-servicio/new-servicio.component";

@Component({
  selector: "app-lists-servicios",
  templateUrl: "./lists-servicios.component.html",
  styleUrls: ["./lists-servicios.component.scss"],
})
export class ListsServiciosComponent implements OnInit {
  productos: ProductoSolicitudServicio[] = [];
  servicios: ServicioSolServicio[] = [];
  productoId: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private solSrv: SolicitudServiciosService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 7,
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
          first: "<<",
          previous: "Anterior",
          next: "Siguiente",
          last: ">>",
        },
      },
    };
    this._route.params.subscribe((params: Params) => {
      this.productoId = parseInt(params.id);
    });
    this.getServicios();
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
        this.servicios = this.servicios.filter(
          (dept) => dept.producto_id === this.productoId
        );
        console.log(this.servicios);
        this.dtTrigger.next();
      });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewServicioComponent, {
      size: "lg",
    });
    const props = {
      productoId: this.productoId,
    };
    modalRef.componentInstance.props = props;
  }

  onEdit(servicio: ServicioSolServicio): void {
    const modalRef: NgbModalRef = this.modalService.open(
      EditServicioComponent,
      {
        size: "lg",
      }
    );
    const props = {
      servicio,
    };
    modalRef.componentInstance.props = props;
  }
}
