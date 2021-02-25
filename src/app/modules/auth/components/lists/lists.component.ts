import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { users } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {


  users: users[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(

      private usersSrv: UsersService


  ) { }

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



  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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



}
