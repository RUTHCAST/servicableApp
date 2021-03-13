import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { EditComponent } from "../edit/edit.component";
import { DetailsComponent } from "../details/details.component";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { NewComponent } from "../new/new.component";

import { Category } from "../../../models/categoy.model";
import { Subject } from "rxjs";
import { CategoriesService } from "../../../services/categories.service";
import { TypesProductsService } from "../../../services/types-products.service";
import { TypeProduct } from "../../../models/types.model";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  typesProduct: TypeProduct[] = [];
  productoId: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private categoriesSrv: CategoriesService,
    private typeSrv: TypesProductsService,
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
    this.getCategorys();
    this.getTypes();
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
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

  onDelete(product: any, message: string): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      product,
      types: this.typesProduct,
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
      id: this.categories.length,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
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
        if (this.productoId) {
          this.categories.filter((value) => value.id === this.productoId);
        }

        console.log(this.categories);
        this.dtTrigger.next();
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
        // if (this.productoId) {
        //   this.typesProduct.filter(
        //     (value) => value.id_categoria === this.productoId
        //   );
        // }

        // this.categories = data;
        console.log(this.typesProduct);
        this.dtTrigger.next();
      });
  }

  verify(product: any) {
    const verify = this.typesProduct.some(
      (arrVal) => arrVal.id_categoria === product.id
    );

    if (verify) {
      const message =
        "La categoria seleccionada tiene tipos asociados, por lo que será redireccionado a la pagina de tipos de productos para que elimine cada uno de ellos.";
      this.onDelete(product, message);
    } else {
      const message =
        "Esta acción eliminara permanentemente la categoría y productos relacionados. Esta seguro de continuar?";
      this.onDelete(product, message);
    }
  }
}
