import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { DepartamentosService } from "../../services/departamentos.service";

@Component({
  selector: "app-delete-department",
  templateUrl: "./delete-department.component.html",
  styleUrls: ["./delete-department.component.scss"],
})
export class DeleteDepartmentComponent implements OnInit {
  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
    public modal: NgbActiveModal,
    private _route: Router,
    private distritoSrv: DepartamentosService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  verify(id: number) {
    const verify = this.props.distritos.some(
      (arrVal) => arrVal.departamento_id === id
    );

    if (verify) {
      this.closeModal();
      this._route.navigate(["/departamentos/distritos/", id]);
    } else {
      // alert("ELIMINAR");
      this.delete();
    }
  }

  delete() {
    this.isLoading = true;
    this.distritoSrv
      .deleteDepartamento(this.props.product.key)
      .then(() => {
        this.success = true;
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
