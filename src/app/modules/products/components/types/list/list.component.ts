import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";

// Components
import { DetailsComponent } from "../details/details.component";
import { EditComponent } from "../edit/edit.component";
import { NewComponent } from "../new/new.component";
import { ModalDeleteComponent } from "../../categories/modal-delete/modal-delete.component";

// Interfaces and services
import { Category } from "../../../models/categoy.model";
import { TypeProduct } from "../../../models/types.model";
import { CategoriesService } from "../../../services/categories.service";
import { TypesProductsService } from "../../../services/types-products.service";
import { PlanProduct } from '../../../models/plans.model';
import { PlansService } from "../../../services/plans.service";
import { DeleteTypeComponent } from "../delete-type/delete-type.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: NgbModal,
    private categoriesSrv: CategoriesService,
    private typeSrv: TypesProductsService,
    private planSrv: PlansService,
    private _route: ActivatedRoute
  ) {}
  categories: Category[] = [];
  typesProduct: TypeProduct[] = [];
  plansProduct: PlanProduct[] = [];

  productoId = null;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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
      if (params.id) {
        console.log("existe el id");
        this.productoId = parseInt(params.id);
      }
    });

    console.log(typeof this.productoId);
    this.getTypes();
    this.getCategorys();
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
  }

  isNumber(val): boolean {
    return typeof val === "number";
  }

  onNew(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      categories: this.categories,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDetail(type: any): void {
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      product: type,
      categories: this.categories,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(type: any): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      product: type,
      categories: this.categories,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(type: any, message: string, plans: PlanProduct[]=[]): void {
    const modalRef: NgbModalRef = this.modalService.open(DeleteTypeComponent, {
      size: "lg",
    });
    const props = {
      type,
      plans,
      message,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  verify(product: any) {
    const verify = this.plansProduct.some(
      (arrVal) => arrVal.id_tipo === product.id
    );

    if (verify) {
      const message =
        "El tipo de producto seleccionado tiene planes asociados, por lo que será redireccionado a la pagina de planes de productos para que elimine cada uno de ellos.";
      this.onDelete(product, message, this.plansProduct);
    } else {
      const message =
        "Esta acción eliminara permanentemente el tipo de producrto. Esta seguro de continuar?";
      this.onDelete(product, message);
    }
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

        console.log("id capturado", this.productoId);
        if (this.productoId != null) {
          console.log("Entro");
          console.log(typeof this.productoId);
          this.typesProduct = this.typesProduct.filter(
            (value) => value.id_categoria === this.productoId
          );
          console.log(this.typesProduct);
        }

        console.log(this.typesProduct);
        this.dtTrigger.next();
      });
  }

  getCategorys(): void {
    this.categoriesSrv
      .getAllCategories()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.categories.length;
        console.log(size);
        this.categories.splice(0, size);

        res.forEach((t) => {
          const category = t.payload.toJSON();
          category["key"] = t.key;
          this.categories.push(category as Category);
        });
        console.log(this.productoId);

        if (this.productoId !== null) {
          this.categories.filter((value) => value.id === this.productoId);
        }

        this.categories.sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        );
        console.log(this.categories);
        // this.dtTrigger.next();
      });
  }
}
