import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  value = null;
  @Input() props: any;
  constructor(private router: Router, public modal: NgbActiveModal) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }
}
