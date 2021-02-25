import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { users } from '../../models/user.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {


  users: users[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(

      private user


  ) { }

  ngOnInit(): void {
  }

}
