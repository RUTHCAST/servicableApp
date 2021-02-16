import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-confirmation",
  templateUrl: "./modal-confirmation.component.html",
  styleUrls: ["./modal-confirmation.component.scss"],
})
export class ModalConfirmationComponent implements OnInit {
  @Input() props: any;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }
}
