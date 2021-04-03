import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";

import { TypeProduct } from "../../../models/types.model";
import { TypesProductsService } from "../../../services/types-products.service";
import { DetailsComponent } from "../details/details.component";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";
// import { PlanProduct } from '../../../models/plans.model';
import { PlansService } from "../../../services/plans.service";
import { PlanProduct } from "../../../models/plans.model";
import { DeletePlanComponent } from "../delete-plan/delete-plan.component";
import { ImageDetailComponent } from "../../../../../core/components/image-detail/image-detail.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  typesProduct: TypeProduct[] = [];
  plansProduct: PlanProduct[] = [];

  productoId = null;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private typeSrv: TypesProductsService,
    private planSrv: PlansService,
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
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo",
        },
      },
    };

    this._route.params.subscribe((params: Params) => {
      if (params.id) {
        console.log("existe el id");
        this.productoId = parseInt(params.id);
      }
    });

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
      product,
      types: this.typesProduct,
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
      product,
      types: this.typesProduct,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(plan: PlanProduct): void {
    const modalRef: NgbModalRef = this.modalService.open(DeletePlanComponent, {
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

  showImage(image:string) {
    const modalRef: NgbModalRef = this.modalService.open(ImageDetailComponent, {
      size: "lg",
    });
    const props = {
      image
    };
    modalRef.componentInstance.props = props;
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

        if (this.productoId != null) {
          this.plansProduct = this.plansProduct.filter(
            (value) => value.id_tipo === this.productoId
          );
          console.log(this.plansProduct);
        }

        // this.categories = data;
        console.log(this.plansProduct);
        this.dtTrigger.next();
      });
  }
}
