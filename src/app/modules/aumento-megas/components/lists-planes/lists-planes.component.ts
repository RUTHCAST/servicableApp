import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";
import { PlanAumentoMegas } from "../../models/planAumentoMegas.model";
import { ProductoAumentoMegas } from "../../models/productoAumentoMegas.model";
import { AumentoMegasService } from "../../services/aumento-megas.service";
import { NewPlanComponent } from "./new-plan/new-plan.component";
import { EditPlanComponent } from "./edit-plan/edit-plan.component";

@Component({
  selector: "app-lists-planes",
  templateUrl: "./lists-planes.component.html",
  styleUrls: ["./lists-planes.component.scss"],
})
export class ListsPlanesComponent implements OnInit {
  planes: PlanAumentoMegas[] = [];
  productos: ProductoAumentoMegas[] = [];
  productoId: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private aumentoMegasSrv: AumentoMegasService,
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
    this.getProductos();
    this.getPlanes();
  }
  // Verificar si se necesita esta peticion
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

        this.planes = this.planes.filter(
          (dept) => dept.producto_id === this.productoId
        );
        console.log(this.planes);
        // this.dtTrigger.next();
      });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewPlanComponent, {
      size: "lg",
    });
    const props = {
      id: this.productos.length,
      productoId: this.productoId,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      // console.log(result);
    });
  }

  onEdit(plan: PlanAumentoMegas): void {
    const modalRef: NgbModalRef = this.modalService.open(EditPlanComponent, {
      size: "lg",
    });
    const props = {
      plan,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
