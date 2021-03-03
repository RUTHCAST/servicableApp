import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";

import { ModalDeleteComponent } from "../../../../../core/components/modal-delete/modal-delete.component";
import { TypeProduct } from "../../../models/types.model";
import { TypesProductsService } from "../../../services/types-products.service";
import { DetailsComponent } from "../details/details.component";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";
// import { PlanProduct } from "../../../models/plans.model";
import { PlansService } from "../../../services/plans.service";
import { PlanProduct } from "../../../models/plans.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  typesProduct: TypeProduct[] = [];
  plansProduct: PlanProduct[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private typeSrv: TypesProductsService,
    private planSrv: PlansService
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

    this.getTypes();
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  onDetail(product: any): void {
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
    const props = {
      id: this.plansProduct.length,
      types: this.typesProduct,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  getTypes(): void {
    this.typeSrv
      .getAllTypes()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.typesProduct.length;
        console.log(size);
        this.typesProduct.splice(0, size);
        res.forEach((t) => {
          const typesProduct = t.payload.toJSON();
          typesProduct["key"] = t.key;
          this.typesProduct.push(typesProduct as TypeProduct);
        });
        this.typesProduct = this.typesProduct.filter(
          (value) => parseInt(value.precio) > 0
        );
        // console.log(this.typesProduct);
      });
  }

  getPlans(): void {
    this.planSrv
      .getAllTypes()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.plansProduct.length;
        console.log(size);
        this.plansProduct.splice(0, size);
        res.forEach((t) => {
          const plansProduct = t.payload.toJSON();
          plansProduct["key"] = t.key;
          this.plansProduct.push(plansProduct as PlanProduct);
        });

        // this.categories = data;
        console.log(this.plansProduct);
        this.dtTrigger.next();
      });
  }
}
