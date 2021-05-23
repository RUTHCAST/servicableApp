import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styles: [
  ]
})
export class DeleteUserComponent implements OnInit {

  success = false;
  isLoading = false;

  @Input() props: any;
  constructor(
  public modal: NgbActiveModal,
  private spinner: NgxSpinnerService,
  private userSrv: UsersService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.spinner.show();
    this.userSrv
      .deleteUser(this.props.user)
      .then(() => {
        this.success = true;
        this.isLoading = false;
        this.spinner.hide();
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
        this.spinner.hide();
      });
  }

}
