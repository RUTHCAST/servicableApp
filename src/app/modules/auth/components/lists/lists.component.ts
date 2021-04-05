import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { users } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DetailsComponent } from '../details/details.component';
import { EditComponent } from '../edit/edit.component';
import { ModalDeleteComponent } from '../../../products/components/categories/modal-delete/modal-delete.component';
import { NewComponent } from '../new/new.component';
import { ImageDetailComponent } from '../../../../core/components/image-detail/image-detail.component';
//import { ModalDeleteComponent } from '../../../../core/components/modal-delete/modal-delete.component';


@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: [],
})
export class ListsComponent implements OnInit, OnDestroy {
  users: users[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private modalService: NgbModal, private usersSrv: UsersService) {}

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

    this.getUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onDetail(user: users): void {
    const modalRef: NgbModalRef = this.modalService.open(DetailsComponent, {
      size: "lg",
    });
    const props = {
      user,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onEdit(user: users): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      user,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  onDelete(user: users): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalDeleteComponent, {
      size: "lg",
    });
    const props = {
      user,
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
      id: this.users.length,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  getUsers(): void {
    this.usersSrv
      .getAllUsers()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.users.length;
        this.users.splice(0, size);

        res.forEach((t) => {
          const users = t.payload.toJSON();
          users["key"] = t.key;
          this.users.push(users as users);
        });
        console.log(this.users);
        this.dtTrigger.next();
      });
  }

  showImage(image: string) {
    console.log(image)
    const modalRef: NgbModalRef = this.modalService.open(ImageDetailComponent, {
      size: "lg",
    });
    const props = {
      image,
    };
    modalRef.componentInstance.props = props;
  }
}
