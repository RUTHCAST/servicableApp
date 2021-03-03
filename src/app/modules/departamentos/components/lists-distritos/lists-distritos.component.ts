import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";

import { Departamento } from "../../models/departamento.model";
import { DepartamentosService } from "../../services/departamentos.service";
import { NewDistritoComponent } from "./new-distrito/new-distrito.component";
import { EditDistritoComponent } from "./edit-distrito/edit-distrito.component";
import { ModalDeleteComponent } from "../../../../core/components/modal-delete/modal-delete.component";
import { Distrito } from "../../models/distrito.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-lists-distritos",
  templateUrl: "./lists-distritos.component.html",
  styleUrls: ["./lists-distritos.component.scss"],
})
export class ListsDistritosComponent implements OnInit, OnDestroy {
  departamentos: Departamento[] = [];
  distritos: any[] = [];
  departamentoId: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private departamentosSrv: DepartamentosService,
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
      this.departamentoId = parseInt(params.id);
    });
    this.getDepartamentos();
    this.getDitritos();
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
  }

  getDitritos(): void {
    this.departamentosSrv
      .getAllDistritos()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.distritos.length;
        console.log(size);
        this.distritos.splice(0, size);

        res.forEach((t) => {
          const distrito = t.payload.toJSON();
          distrito["key"] = t.key;
          this.distritos.push(distrito as Distrito);
        });
        this.distritos = this.distritos.filter(
          (dept) => dept.departamento_id === this.departamentoId
        );
        // this.distritos = this.departamentos[0].distritos;
        console.log(this.distritos);
      });
  }

  getDepartamentos(): void {
    this.departamentosSrv
      .getAllDepartamentos()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.departamentos.length;
        console.log(size);
        this.departamentos.splice(0, size);

        res.forEach((t) => {
          const departamento = t.payload.toJSON();
          departamento["key"] = t.key;
          this.departamentos.push(departamento as Departamento);
        });
        console.log(this.departamentos);
        // this.dtTrigger.next();
      });
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewDistritoComponent, {
      size: "lg",
    });
    const props = {
      id: this.departamentos.length,
      departamento_id: this.departamentoId,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(distrito: Distrito): void {
    const modalRef: NgbModalRef = this.modalService.open(
      EditDistritoComponent,
      {
        size: "lg",
      }
    );
    const props = {
      distrito,
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
}
