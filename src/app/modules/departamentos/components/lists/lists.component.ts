import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { DetailsComponent } from "../details/details.component";
import { Departamento } from "../../models/departamento.model";
import { DepartamentosService } from "../../services/departamentos.service";
import { ModalDeleteComponent } from "../../../../core/components/modal-delete/modal-delete.component";
import { NewComponent } from "../new/new.component";
import { EditComponent } from "../edit/edit.component";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  departamentos: Departamento[] = [];

  constructor(
    private modalService: NgbModal,
    private departamentosSrv: DepartamentosService
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();
  }

  onDetail(departamento: Departamento): void {
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      product: departamento,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(departamento: Departamento): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: departamento,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(departamento: Departamento): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      product: departamento,
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
      id: this.departamentos.length,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
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
}
