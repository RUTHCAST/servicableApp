import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
})
export class DeleteComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
  closeModal() {
    this.modal.close(false);
  }
}
