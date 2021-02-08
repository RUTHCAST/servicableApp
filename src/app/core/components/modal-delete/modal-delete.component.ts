import { Component, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-delete",
  templateUrl: "./modal-delete.component.html",
  styleUrls: ["./modal-delete.component.scss"],
})
export class ModalDeleteComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }
}
