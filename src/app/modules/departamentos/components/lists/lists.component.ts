import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { DetailsComponent } from "../details/details.component";
import { Departamento } from "../../models/departamento.model";
import { DepartamentosService } from "../../services/departamentos.service";
import { ModalDeleteComponent } from "../../../products/components/categories/modal-delete/modal-delete.component";
import { NewComponent } from "../new/new.component";
import { EditComponent } from "../edit/edit.component";
import { Distrito } from "../../models/distrito.model";
import { DeleteDepartmentComponent } from "../delete-department/delete-department.component";
import { Subject } from "rxjs";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  departamentos: Departamento[] = [];
  distritos: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private departamentosSrv: DepartamentosService
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();
    this.getDitritos();
  }

  onDetail(departamento: Departamento): void {
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      product: departamento,
    };
    modalRef.componentInstance.props = props;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // });
  }

  onEdit(departamento: Departamento): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: departamento,
    };
    modalRef.componentInstance.props = props;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // });
  }

  onDelete(departamento: Departamento, message: string): void {
    const modalRef: NgbModalRef = this.modalService.open(
      DeleteDepartmentComponent,
      {
        size: "lg",
      }
    );
    const props = {
      product: departamento,
      distritos: this.distritos,
      message,
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
    // modalRef.result.then((result) => {
    //   console.log(result);
    // });
  }

  verify(product: any) {
    console.log("ingreso a verify function");
    const verify = this.distritos.some(
      (arrVal) => arrVal.departamento_id === product.id
    );
    console.log(verify);
    if (verify) {
      const message =
        "El departamento seleccionada tiene distritos asociados, por lo que será redireccionado a la pagina de distritos para que elimine cada uno de ellos.";
      this.onDelete(product, message);
    } else {
      const message =
        "Esta acción eliminara permanentemente el departamento. Esta seguro de continuar?";
      this.onDelete(product, message);
    }
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
        this.dtTrigger.next();
      });
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
        // this.distritos = this.departamentos[0].distritos;
        console.log(this.distritos);
      });
  }
}
